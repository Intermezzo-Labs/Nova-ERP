CREATE TYPE invoice_status AS ENUM ('Pending', 'Canceled', 'Stale', 'Completed', 'Rejected');

CREATE TABLE IF NOT EXISTS public.invoice (
    id BIGINT generated by default as IDENTITY PRIMARY KEY,
    company_id BIGINT REFERENCES public.company NOT NULL,
    customer_id BIGINT REFERENCES public.customer NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,

    document_location text not null,
    total BIGINT not null,
    status invoice_status NOT NULL DEFAULT 'Pending',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.invoice
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row-Level Security (RLS)
ALTER TABLE public.invoice ENABLE ROW LEVEL SECURITY;

-- Create the "Users can view own data" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'invoice'
          AND policyname = 'Users can view own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can view own data" ON public.invoice
                FOR SELECT
                USING (auth.uid() = user_id)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the "Users can update own data" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'invoice'
          AND policyname = 'Users can update own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can update own data" ON public.invoice
                FOR UPDATE
                USING (auth.uid() = user_id)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the "Service role can insert users" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'invoice'
          AND policyname = 'Service role can insert'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Service role can insert" ON public.invoice
                FOR INSERT
                WITH CHECK (true)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;
