import './LoginPage.css';
import { ChangeEvent, FormEvent, useState} from 'react';
import { useLocation } from 'wouter';
import { Input } from '@components/';
import { useAuth } from '@hooks/';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, navigate] = useLocation();
  const { login } = useAuth();

  const onEmailChange = (_: string, value: any) => {
    setEmail(value);
  };

  const onPasswordChange = (_: string, value: any) => {
    setPassword(value);
  };

  const handleLogin = async (event: FormEvent) => {
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
      <form className='login-form' onSubmit={handleLogin}>
        <Input className='login-input' type='text' name='email' label='Email' value={email} onChange={onEmailChange}/>
        <Input className='login-input' type='password' name='password' label='Password' value={password} onChange={onPasswordChange}/>
        <button className='login-button' type='submit'>Login</button>
      </form>
    </div>
  );
};
