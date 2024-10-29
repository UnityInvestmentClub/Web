import './index.css';
import { useLocation } from 'wouter';
import { useAuth, useAppState } from '../../hooks';

export const Nav = () => {
  const { logout } = useAuth();
  const { loggedIn } = useAppState();
  const [_, navigate] = useLocation();

  const handleLogout = () => {
    logout()
      .catch(console.error);
  };

  return (
    loggedIn
      ? <div className='nav'>
        <div className='navtab' onClick={() => navigate('/')}>
          Home
        </div>
        <div className='navtab' onClick={() => navigate('/ssg')}>
          Create SSG
        </div>
        <div className='navtab navtab-right' onClick={() => navigate('/profile')}>
          Profile
        </div>
        <div className='navtab' onClick={handleLogout}>
          Log Out
        </div>
      </div>
      : <div></div>
  );
};