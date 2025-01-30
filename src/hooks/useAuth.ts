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

    // Logs user out even if error occurs
    setLoggedOutState();

    if (error)
      throw error;
  };

  const updateEmail = async (email: string) => {
    var { error } = await client.auth.updateUser({ email });

    if (error)
      throw error;
  };

  const sendOTP = async (email: string) => {
    var { error } = await client.auth.signInWithOtp({ email, options: { shouldCreateUser: false }});

    if (error)
      throw error;
  };

  const verifyOTP = async (email: string, otp: string) => {
    var { error } = await client.auth.verifyOtp({ email, token: otp, type: 'email'});

    if (error)
      throw error;

    setLoggedInState();
  }

  const updatePassword = async (password: string) => {
    var { error } = await client.auth.updateUser({ password });

    if (error)
      throw error;
  };

  return { login, logout, sendOTP, verifyOTP, updatePassword, updateEmail };
};