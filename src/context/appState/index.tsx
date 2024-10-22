import { useReducer, createContext } from 'react';
import { EmptyFunction } from '../../_types';
import { ActionBase, PropsBase } from '../../_types';

type AppStateState = {
  loggedIn: boolean,
  setLoggedInState: EmptyFunction,
  setLoggedOutState: EmptyFunction
}

const initial: AppStateState = {
  // Checks if supabase auth token is in local storage
  loggedIn: !!localStorage.getItem('sb-vtzzrkeofjdjfusqxjvh-auth-token'),
  setLoggedInState: () => undefined,
  setLoggedOutState: () => undefined
};

export const AppStateContext = createContext(initial);

const reducer = (state: AppStateState, { type }: ActionBase) => {
  switch (type) {
    case 'login': return { ...state, loggedIn: true };
    case 'logout': return { ...state, loggedIn: false };
  }
};

export const AppStateProvider = ({ children }: PropsBase) => {
  const [ appState, dispatch ] = useReducer(reducer, initial);

  const setLoggedInState = () => dispatch({ type: 'login' });
  const setLoggedOutState = () => dispatch({ type: 'logout' });

  return <AppStateContext.Provider value={{ ...appState, setLoggedInState, setLoggedOutState }}>{children}</AppStateContext.Provider>
};