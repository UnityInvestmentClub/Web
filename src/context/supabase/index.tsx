import { createContext, useContext, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DBId, DBKey } from '@constants/';
import { PropsBase } from '@_types/';

const supabaseClient = createClient(`https://${DBId}.supabase.co`, DBKey);

const SupabaseContext = createContext(supabaseClient);

export const SupabaseProvider = ({ children }: PropsBase) => {
  const [client] = useState(supabaseClient);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
};

export const useSupabase = () => useContext(SupabaseContext);