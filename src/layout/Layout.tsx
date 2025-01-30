import './Layout.css';
import { Redirect, Route, Switch } from 'wouter';
import { LoginPage, RecoverPage, DashboardPage, SSGPage, ProfilePage } from '@pages/';
import { Nav } from '@components/';
import { useAppState } from '@hooks/';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  path: string,
  redirectPath?: string
}

export const Layout = () => {
  const { isLoggedIn } = useAppState();

  const AuthRoute = ({ children, path, redirectPath }: Props) => {
    return (
      <Route path={path}>
        { isLoggedIn ? <Redirect to={redirectPath ?? '/'} /> : <>{children}</>}
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
          <AuthRoute path='/login'><LoginPage /></AuthRoute>
          <AuthRoute path='/recover' redirectPath='/profile'><RecoverPage /></AuthRoute>
          
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