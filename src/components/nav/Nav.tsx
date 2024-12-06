import './Nav.css';
import { useLocation } from 'wouter';
import { useAuth, useAppState } from '@hooks/';

export const Nav = () => {
  const { logout } = useAuth();
  const { loggedIn } = useAppState();
  const [_, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  return !loggedIn
    ? (<div></div>)
    : (<div className='nav'>
      <div className='navtab' onClick={() => navigate('/')}>
        Home
      </div>
      <div className='navtab' onClick={() => navigate('/ssg')}>
        Create SSG
      </div>
      <div className='navtab' onClick={() => navigate('/profile')}>
        Profile
      </div>
      <div className='navtab' onClick={handleLogout}>
        Log Out
      </div>
    </div>);
};