import { createContext, useContext, useReducer, useState } from 'react';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { DBUrl, DBKey } from '../../constants';
import { PropsBase } from '../../_types';

const SupabaseContext = createContext({});
const supabaseClient = createClient(DBUrl, DBKey);

export const SupabaseProvider = ({ children }: PropsBase) => {
  const [client] = useState(supabaseClient);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
};

export const useSupabase = () => {
  const context: Partial<SupabaseClient> = useContext(SupabaseContext);

  return context;
};