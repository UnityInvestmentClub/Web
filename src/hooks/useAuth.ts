import { useAppState, useSupabase } from '@hooks/';

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

  const updateEmail = async (email: string) => {
    var { error } = await client.auth.updateUser({ email });

    if (error)
      throw error;
  };

  const resetPassword = async (email: string) => {
    var { error } = await client.auth.resetPasswordForEmail(email);

    if (error)
      throw error;
  };

  const updatePassword = async (password: string) => {
    var { error } = await client.auth.updateUser({ password });

    if (error)
      throw error;
  };

  return { login, logout, resetPassword, updatePassword, updateEmail };
};