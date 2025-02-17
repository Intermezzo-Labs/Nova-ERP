CREATE TABLE IF NOT EXISTS public.inventory_item (
    id BIGINT generated by default as IDENTITY PRIMARY KEY,
    company_id BIGINT REFERENCES public.company NOT NULL,
    user_id UUID REFERENCES auth.users NOT NULL,
    details jsonb not null,
    quantity INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.inventory_item
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row-Level Security (RLS)
ALTER TABLE public.inventory_item ENABLE ROW LEVEL SECURITY;

-- Create the "Users can view own data" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'inventory_item'
          AND policyname = 'Users can view own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can view own data" ON public.inventory_item
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
          AND tablename = 'inventory_item'
          AND policyname = 'Users can update own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can update own data" ON public.inventory_item
                FOR UPDATE
                USING (auth.uid() = user_id)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the "Users can delete own data" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'inventory_item'
          AND policyname = 'Users can delete own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can delete own data" ON public.inventory_item
                FOR DELETE
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
          AND tablename = 'inventory_item'
          AND policyname = 'Service role can insert'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Service role can insert" ON public.inventory_item
                FOR INSERT
                WITH CHECK (true)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

alter table public.product drop column line_item_id;
alter table public.product add column inventory_item_id BIGINT references public.inventory_item(id) on delete restrict;

drop table public.line_item;