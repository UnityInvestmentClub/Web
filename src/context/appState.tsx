import { useReducer, useContext, createContext } from 'react';
import { DBId } from '@constants/';
import { ActionBase, PropsBase } from '@_types/';

type AppStateState = {
  loggedIn: boolean,
  authId: string,
  isMacOS: boolean,
  setLoggedInState: () => void,
  setLoggedOutState: () => void
}

const initial: AppStateState = {
  loggedIn: !!localStorage.getItem(`sb-${DBId}-auth-token`),
  authId: JSON.parse(localStorage.getItem(`sb-${DBId}-auth-token`))?.user.id,
  isMacOS: navigator.platform.indexOf('Max') !== -1,
  setLoggedInState: () => undefined,
  setLoggedOutState: () => undefined
};

const AppStateContext = createContext(initial);

const reducer = (state: AppStateState, { type }: ActionBase) => {
  switch (type) {
    case 'login':
      return {
        ...state,
        loggedIn: true,
        authId: JSON.parse(localStorage.getItem(`sb-${DBId}-auth-token`))?.user.id
      };
    case 'logout':
      return {
        ...state,
        loggedIn: false,
        authId: null
      };
  }
};

export const AppStateProvider = ({ children }: PropsBase) => {
  const [ appState, dispatch ] = useReducer(reducer, initial);

  const setLoggedInState = () => dispatch({ type: 'login' });
  const setLoggedOutState = () => dispatch({ type: 'logout' });

  return <AppStateContext.Provider value={{ ...appState, setLoggedInState, setLoggedOutState }}>{children}</AppStateContext.Provider>
};

export const useAppState = () => useContext(AppStateContext);