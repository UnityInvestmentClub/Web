import { createContext, useContext, useReducer } from 'react';
import { ActionBase, PropsBase } from '../../_types';

interface State {
  loggedIn: boolean,
  setLoggedInState: () => void,
  setLoggedOutState: () => void
}

const AppStateContext = createContext({});

const initial = {
  // Checks if supabase auth token is in local storage
  loggedIn: !!localStorage.getItem('sb-vtzzrkeofjdjfusqxjvh-auth-token')
};

const reducer = (state = initial, { type }: ActionBase) => {
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

export const useAppState = () => {
  const context: Partial<State> = useContext(AppStateContext);

  return context;
};