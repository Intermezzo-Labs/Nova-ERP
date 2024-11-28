-- Create NovaUser table
CREATE TABLE public.NovaUser (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone VARCHAR,
    address TEXT,
    role VARCHAR NOT NULL DEFAULT 'User',
    status VARCHAR NOT NULL DEFAULT 'Active',
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now()
);

-- Add constraints for role and status
ALTER TABLE public.NovaUser
ADD CONSTRAINT role_check CHECK (role IN ('Admin', 'User', 'Manager'));

ALTER TABLE public.NovaUser
ADD CONSTRAINT status_check CHECK (status IN ('Active', 'Inactive'));
