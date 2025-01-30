import './RecoverPage.css';
import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { Input, Button } from '@components/';
import { useAuth } from '@hooks/';

export const RecoverPage = () => {
  const [isOTPSent, setIsOTPSent] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const [recoverSuccess, setRecoverSuccess] = useState(null);
  const [recoverError, setRecoverError] = useState(null);

  const { sendOTP, verifyOTP } = useAuth();

  const onEmailChange = (_: string, value: unknown) => {
    setEmail(value as string);
    
    setRecoverSuccess(null);
    setRecoverError(null);
  };

  const onOTPChange = (_: string, value: unknown) => {
    setOTP(value as string);

    setRecoverSuccess(null);
    setRecoverError(null);
  }

  const handleRecovery = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (!isOTPSent) {
        // Sending OTP
        await sendOTP(email);
      
        setRecoverSuccess('Magic code sent!');
        setIsOTPSent(true);
      } else {
        //Verifying OTP
        await verifyOTP(email, otp);
      }

      setRecoverError(null);
    } catch (e) {
      setRecoverSuccess(null);
      setRecoverError('Something went wrong! Check everything is entered correctly');
    }
  };

  return (
    <div className='recover'>
      <form className='recover-form' autoComplete='on' onSubmit={handleRecovery}>
        <h2 className='recover-header'>Unity Investment Club</h2>
        <Input className='recover-input' type='text' name='email' label='Email' value={email} disabled={isOTPSent} onChange={onEmailChange}/>
        {isOTPSent && <Input className='recover-input' type='text' name='otp' label='Magic Code' value={otp} onChange={onOTPChange}/>}

        <Button className='recover-button' type='submit'>{isOTPSent ? 'Verify' : 'Send'} Magic Code</Button>
        {recoverSuccess && <p className='recover-success'>{recoverSuccess}</p>}
        {recoverError && <p className='recover-error'>{recoverError}</p>}

        <Link className='login-link' href='/login'>Log in</Link>
      </form>
    </div>
  );
};
