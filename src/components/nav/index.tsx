import './index.css';
import { useLocation } from 'wouter';
import { useApi, useAppState } from '../../hooks';

export const Nav = () => {
  const { logout } = useApi();
  const { loggedIn } = useAppState();
  const [_, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
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
        <div className='navtab navtab-right' onClick={handleLogout}>
          Log Out
        </div>
      </div>
      : <div></div>
  );
};