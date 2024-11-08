import { useReducer, useContext, createContext } from 'react';
import { DBId } from '@constants/';
import { ActionBase, PropsBase, EmptyFunction } from '@_types/';

type AppStateState = {
  loggedIn: boolean,
  authId: string,
  setLoggedInState: EmptyFunction,
  setLoggedOutState: EmptyFunction
}

const initial: AppStateState = {
  loggedIn: !!localStorage.getItem(`sb-${DBId}-auth-token`),
  authId: JSON.parse(localStorage.getItem(`sb-${DBId}-auth-token`))?.user.id,
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