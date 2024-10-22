import { createContext, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DBUrl, DBKey } from '../../constants';
import { PropsBase } from '../../_types';

const supabaseClient = createClient(DBUrl, DBKey);

export const SupabaseContext = createContext(supabaseClient);

export const SupabaseProvider = ({ children }: PropsBase) => {
  const [client] = useState(supabaseClient);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
};