
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
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    phone TEXT,
    address TEXT,
    role TEXT NOT NULL DEFAULT 'User' CHECK (role IN ('Admin', 'Manager', 'User')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the trigger
CREATE TRIGGER IF NOT EXISTS set_updated_at
    BEFORE UPDATE ON public.nova_users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.nova_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Users can view own data" ON public.nova_users
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own data" ON public.nova_users
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Service role can insert users" ON public.nova_users
    FOR INSERT 
    WITH CHECK (true);
