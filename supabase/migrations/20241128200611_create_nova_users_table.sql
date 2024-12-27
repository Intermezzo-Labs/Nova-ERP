CREATE TYPE nova_user_role AS ENUM ('Admin', 'Manager', 'User');
CREATE TYPE nova_user_status AS ENUM ('Active', 'Inactive');

-- Create the updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the nova_users table
CREATE TABLE IF NOT EXISTS public.nova_users (
    id BIGINT generated by default as IDENTITY PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
    email TEXT,
    preferences JSONB,
    role nova_user_role NOT NULL DEFAULT 'User',
    status nova_user_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    archived_at TIMESTAMP
);

-- Drop the trigger if it already exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at') THEN
        DROP TRIGGER set_updated_at ON public.nova_users;
    END IF;
END;
$$;

-- Create the trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.nova_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
    

-- Enable Row-Level Security (RLS)
ALTER TABLE public.nova_users ENABLE ROW LEVEL SECURITY;

-- Create the "Users can view own data" policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'nova_users'
          AND policyname = 'Users can view own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can view own data" ON public.nova_users
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
          AND tablename = 'nova_users'
          AND policyname = 'Users can update own data'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Users can update own data" ON public.nova_users
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
          AND tablename = 'nova_users'
          AND policyname = 'Service role can insert users'
    ) THEN
        EXECUTE FORMAT(
            'CREATE POLICY "Service role can insert users" ON public.nova_users
                FOR INSERT
                WITH CHECK (true)'
        );
    END IF;
END;
$$ LANGUAGE plpgsql;
