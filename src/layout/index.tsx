import './index.css';
import { Redirect, Route, Router, Switch } from 'wouter';
import { LoginPage, DashboardPage, SSGPage, ProfilePage } from '@pages/';
import { Nav } from '@components/';
import { useAppState } from '@hooks/';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  path: string
}

export const Layout = () => {
  const { loggedIn } = useAppState();

  const ProtectedRoute = ({ children, path }: Props) => {
    return (
      <Route path={path}>
        { loggedIn ? <>{children}</> : <Redirect to='/login' /> }
      </Route>
    );
  };

  return (
    <main>
      {/* base='/Web' needed to support gh pages*/}
      <Router base='/Web'>
        <Nav />
        <div className='main'>
          <Switch>
            <Route path='/login'>
              { loggedIn ? <Redirect to='/' /> : <LoginPage /> }
            </Route>
            <ProtectedRoute path='/'><DashboardPage /></ProtectedRoute>
            <ProtectedRoute path='/ssg'><SSGPage /></ProtectedRoute>
            <ProtectedRoute path='/ssg/:id'><SSGPage /></ProtectedRoute>
            <ProtectedRoute path='/profile'><ProfilePage /></ProtectedRoute>
            <Route path='*'><Redirect to='/' /></Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
};