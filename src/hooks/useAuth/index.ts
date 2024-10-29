import { useAppState, useSupabase } from '../index';

export const useAuth = () => {
  const client = useSupabase();
  const { setLoggedInState, setLoggedOutState } = useAppState();

  const login = async (email: string, password: string) => {
    var { error } = await client.auth.signInWithPassword({ email, password });

    if (error)
      throw error;

    setLoggedInState();
  };

  const logout = async () => {
    var { error } = await client.auth.signOut();

    if (error)
      throw error;

    setLoggedOutState();
  };

  const updatePassword = async (password: string) => {
    var { error } = await client.auth.updateUser({ password });

    if (error)
      throw error;
  };

  return { login, logout, updatePassword };
};