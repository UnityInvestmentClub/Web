import './index.css';
import { Redirect, Route, Switch } from 'wouter';
import { DashboardPage, SSGPage, LoginPage } from '../pages';
import { Nav } from '../components'
import { useAppState } from '../context';
import { PropsBase } from '../_types';

interface Props extends PropsBase {
  path: string
};

export default () => {
  const { loggedIn } = useAppState();

  const ProtectedRoute = ({ children, path }: Props) => {
    return (
      <Route path={path}>
        {
          loggedIn
            ? <>{children}</>
            : <Redirect to='/login' />
        }
      </Route>
    );
  };

  return (
    <main>
      <Nav />
      <div className='main'>
        <Switch>
          <Route path='/login'>{ loggedIn ? <Redirect to='/' /> : <LoginPage /> }</Route>
          <ProtectedRoute path='/'><DashboardPage /></ProtectedRoute>
          <ProtectedRoute path='/ssg'><SSGPage /></ProtectedRoute>
          <ProtectedRoute path='/ssg/:id'><SSGPage /></ProtectedRoute>
          <Route path='*'><Redirect to='/' /></Route>
        </Switch>
      </div>
    </main>
  );
};