import './LoginPage.css';
import { FormEvent, useState} from 'react';
import { useLocation } from 'wouter';
import { Input } from '@components/';
import { useAuth } from '@hooks/';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const [_, navigate] = useLocation();
  const { login } = useAuth();

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const onEmailChange = (_: string, value: any) => {
    setEmail(value);
  };

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const onPasswordChange = (_: string, value: any) => {
    setPassword(value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password);

      navigate('/');
    } catch (e) {
      setLoginError('Something went wrong! Check your credentials');
    }
  };

  return (
    <div className='login'>
      <form className='login-form' autoComplete='on' onSubmit={handleLogin}>
        <h3 className='login-header'>Unity Investment Club</h3>
        <Input className='login-input' type='text' name='email' label='Email' value={email} onChange={onEmailChange}/>
        <Input className='login-input' type='password' name='password' label='Password' value={password} onChange={onPasswordChange}/>
        
        <button className='login-button' type='submit'>Login</button>
        {loginError && <p className='login-error'>{loginError}</p>}
      </form>
    </div>
  );
};
