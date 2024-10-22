import './index.css';
import { useState} from 'react';
import { useLocation } from 'wouter';
import { useApi } from '../../hooks';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, navigate] = useLocation();
  const { login } = useApi();

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }

    navigate('/');
  };

  return (
    <div className='login'>
      <div className='login-form'>
        <div className='login-input-container'>
          <p className='login-input-label'>Email</p>
          <input className='login-input' type='text' name='email' value={email} onChange={onEmailChange}></input>
        </div>
        <div className='login-input-container'>
          <p className='login-input-label'>Password</p>
          <input className='login-input' type='password' name='password' value={password} onChange={onPasswordChange}></input>
        </div>
        <button className='login-button' type='submit' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
