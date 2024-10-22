import { useAppState, useSupabase } from '../index';

export const useApi = () => {
  const client = useSupabase();
  const { setLoggedInState, setLoggedOutState } = useAppState();

  const login = async (email: string, password: string) => {
    const { error } = await client.auth.signInWithPassword({ email, password });
  
    // TODO: Robust error handling system
    if (error)
      throw error;

    setLoggedInState();
  };

  const logout = async () => {
    const { error } = await client.auth.signOut();

    // TODO: Robust error handling system
    if (error)
      throw error;

    setLoggedOutState();
  };

  const getSSGList = async () => {
    const { data, error } = await client.from('ssgs').select('*').order('created_date', { ascending: false });

    // TODO: Robust error handling system
    if (error)
      throw error;

    return data;
  };

  const getSSG = async (id: number) => {
    const { data, error } = await client.from('ssgs').select('*').eq('id', id).single();

    // TODO: Robust error handling system
    if (error)
      throw error;

    return data;
  };

  const saveSSG = async (ssg: any) => {
    const { error } = await client.from('ssgs').insert({ ...ssg, created_date: new Date().toISOString() });

    // TODO: Robust error handling system
    if (error)
      throw error;
  }

  const updateSSG = async (id: number, ssg: any) => {
    const { error } = await client.from('ssgs').update({ ...ssg, modified_date: new Date().toISOString() }).eq('id', id);

    // TODO: Robust error handling system
    if (error)
      throw error;
  }

  return {
    login,
    logout,
    getSSGList,
    getSSG,
    saveSSG,
    updateSSG
  };
}