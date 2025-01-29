import './Layout.css';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { LoginPage, RecoverPage, DashboardPage, SSGPage, ProfilePage } from '@pages/';
import { Nav } from '@components/';
import { useAppState, useSupabase } from '@hooks/';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  path: string
}

export const Layout = () => {
  const client = useSupabase();
  const { isLoggedIn, setLoggedInState } = useAppState();

  useEffect(() => {
    const { data } = client.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' && !isLoggedIn) {
        // If user enters site from password recovery email, reset app state
        setLoggedInState();
      }
    });

    return () => data.subscription.unsubscribe();
  }, [client, isLoggedIn, setLoggedInState]);

  const AuthPath = ({ children, path }: Props) => {
    return (
      <Route path={path}>
        { isLoggedIn ? <Redirect to='/' /> : <>{children}</>}
      </Route>
    )
  };

  const ProtectedRoute = ({ children, path }: Props) => {
    return (
      <Route path={path}>
        { isLoggedIn ? <>{children}</> : <Redirect to='/login' /> }
      </Route>
    );
  };

  return (
    <main>
      <Nav />
      <div className='main'>
        <Switch>
          <AuthPath path='/login'><LoginPage /></AuthPath>
          <AuthPath path='/recover'><RecoverPage /></AuthPath>
          
          <ProtectedRoute path='/'><DashboardPage /></ProtectedRoute>
          <ProtectedRoute path='/ssg'><SSGPage /></ProtectedRoute>
          <ProtectedRoute path='/ssg/:id'><SSGPage /></ProtectedRoute>
          <ProtectedRoute path='/profile'><ProfilePage /></ProtectedRoute>
          
          <Route path='*'><Redirect to='/' /></Route>
        </Switch>
      </div>
    </main>
  );
};