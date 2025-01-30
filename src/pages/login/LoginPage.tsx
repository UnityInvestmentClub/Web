import './LoginPage.css';
import { FormEvent, useState} from 'react';
import { Link } from 'wouter';
import { Input, Button } from '@components/';
import { useAuth } from '@hooks/';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const { login } = useAuth();

  const onEmailChange = (_: string, value: unknown) => {
    setEmail(value as string);
    
    setLoginError(null);
  };

  const onPasswordChange = (_: string, value: unknown) => {
    setPassword(value as string);
  
    setLoginError(null);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(email, password);
    } catch (e) {
      setLoginError('Something went wrong! Check your credentials');
    }
  };

  return (
    <div className='login'>
      <form className='login-form' autoComplete='on' onSubmit={handleLogin}>
        <h2 className='login-header'>Unity Investment Club</h2>
        <Input className='login-input' type='text' name='email' label='Email' value={email} onChange={onEmailChange}/>
        <Input className='login-input' type='password' name='password' label='Password' value={password} onChange={onPasswordChange}/>

        <Button className='login-button' type='submit'>Log In</Button>
        {loginError && <p className='login-error'>{loginError}</p>}

        <Link className='forgot-password-link' href='/recover'>Forgot Password?</Link>
      </form>
    </div>
  );
};
