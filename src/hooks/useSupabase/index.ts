import { useContext } from 'react';
import { SupabaseContext } from '../../context';

export const useSupabase = () => useContext(SupabaseContext);