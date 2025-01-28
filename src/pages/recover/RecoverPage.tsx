import './RecoverPage.css';
import { FormEvent, useState} from 'react';
import { Link } from 'wouter';
import { Input, Button } from '@components/';
import { useAuth } from '@hooks/';

export const RecoverPage = () => {
  const [email, setEmail] = useState('');
  const [recoverSuccess, setRecoverSuccess] = useState(null);
  const [recoverError, setRecoverError] = useState(null);

  const { resetPassword } = useAuth();

  const onEmailChange = (_: string, value: unknown) => {
    setEmail(value as string);
    
    setRecoverSuccess(null);
    setRecoverError(null);
  };

  const handleRecover = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await resetPassword(email);
      
      setRecoverSuccess('Recovery email sent!');
    } catch (e) {
      setRecoverError('Something went wrong! Check your email or try again later');
    }
  };

  return (
    <div className='recover'>
      <form className='recover-form' autoComplete='on' onSubmit={handleRecover}>
        <h2 className='recover-header'>Unity Investment Club</h2>
        <Input className='recover-input' type='text' name='email' label='Email' value={email} onChange={onEmailChange}/>

        <Button className='recover-button' type='submit'>Send Recovery Email</Button>
        {recoverSuccess && <p className='recover-success'>{recoverSuccess}</p>}
        {recoverError && <p className='recover-error'>{recoverError}</p>}

        <Link className='login-link' href='/login'>Log in</Link>
      </form>
    </div>
  );
};
