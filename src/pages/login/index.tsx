import './index.css';
import { useState} from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../../hooks';
import { ButtonClickEvent, InputChangeEvent } from '../../_types';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, navigate] = useLocation();
  const { login } = useAuth();

  const onEmailChange = (e: InputChangeEvent) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: InputChangeEvent) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: ButtonClickEvent) => {
    e.preventDefault();

    login(email, password)
      .then(() => navigate('/'));
  };

  return (
    <div className='login'>
      <form className='login-form'>
        <div className='login-input-container'>
          <p className='login-input-label'>Email</p>
          <input className='login-input' type='text' name='email' value={email} onChange={onEmailChange}></input>
        </div>
        <div className='login-input-container'>
          <p className='login-input-label'>Password</p>
          <input className='login-input' type='password' name='password' value={password} onChange={onPasswordChange}></input>
        </div>
        <button className='login-button' type='submit' onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};
