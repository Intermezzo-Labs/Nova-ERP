CREATE OR REPLACE FUNCTION public.get_user_by_pubkey(p_pubkey text)
  RETURNS auth.users AS
$$
DECLARE
  v_user auth.users;
BEGIN
  SELECT * INTO v_user 
  FROM auth.users u
  WHERE u.raw_user_metadata ->> 'public_key' = p_pubkey;

  RETURN v_user;
END;
$$
LANGUAGE plpgsql;