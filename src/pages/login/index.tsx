import './index.css';
import { ChangeEvent, MouseEvent, useState} from 'react';
import { useLocation } from 'wouter';
import { Input } from '@components/';
import { useAuth } from '@hooks/';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, navigate] = useLocation();
  const { login } = useAuth();

  const onEmailChange = ({ target }: ChangeEvent) => {
    setEmail((target as HTMLInputElement).value);
  };

  const onPasswordChange = ({ target }: ChangeEvent) => {
    setPassword((target as HTMLInputElement).value);
  };

  const handleLogin = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      await login(email, password);

      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='login'>
      <form className='login-form'>
        <Input className='login-input' type='text' name='email' label='Email' value={email} onChange={onEmailChange}/>
        <Input className='login-input' type='password' name='password' label='Password' value={password} onChange={onPasswordChange}/>
        <button className='login-button' type='submit' onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};
