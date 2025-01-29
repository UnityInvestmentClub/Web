import './Nav.css';
import { Link } from 'wouter';
import { useAuth, useAppState } from '@hooks/';

export const Nav = () => {
  const { logout } = useAuth();
  const { isLoggedIn } = useAppState();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  return !isLoggedIn
    ? (<div></div>)
    : (<div className='nav'>
      <Link className='navtab' href='/'>
        Home
      </Link>
      <Link className='navtab' href='/ssg'>
        Create SSG
      </Link>
      <Link className='navtab' href='/profile'>
        Profile
      </Link>
      <div className='navtab' onClick={handleLogout}>
        Log Out
      </div>
    </div>);
};