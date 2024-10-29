import './index.css';
import { useEffect, useState} from 'react';
//import { useLocation } from 'wouter';
import { useProfile, useAuth } from '../../hooks';

const initialProfile = {
  firstName: '',
  lastName: '',
  joinDate: '',
  exitDate: '',
  address: '',
  city: '',
  state: '',
  zipcode: ''
};

export const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { getProfile, updateProfile } = useProfile();
  const { updatePassword } = useAuth();

  useEffect(() => {
    const loadData = () => {
      getProfile()
        .then(setProfile)
        .catch(console.error);
    };

    loadData();
  }, [getProfile]);

  const handleSave = () => {
    updateProfile(profile)
      .catch(console.error);
  };

  const handleUpdatePassword = () => {
    const symbolRegex = /[$-/:-?{-~!"^_`]/;
    var validPassword = true;

    if (password !== passwordConfirmation)
      validPassword = false;
    if (password.length < 6)
      validPassword = false;
    if (password === password.toLowerCase())
      validPassword = false;
    if (password === password.toUpperCase())
      validPassword = false;
    if (!symbolRegex.test(password))
      validPassword = false;

    if (validPassword)
      updatePassword(password)
        .catch(console.error);
  };

  const onFormChange = (e: any) => {
    var { name, value } = e.target;
    
    setProfile({ ...profile, [name]: value});
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmationChange = (e: any) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <div className='profile'>
      <div className='profile-form'>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>First Name</p>
            <input className='profile-input' type='text' name='firstName' value={profile.firstName} onChange={onFormChange}></input>
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Last Name</p>
            <input className='profile-input' type='text' name='lastName' value={profile.lastName} onChange={onFormChange}></input>
          </div>
        </div>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Join Date</p>
            <input className='profile-input' type='date' name='joinDate' value={profile.joinDate} onChange={onFormChange}></input>
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Exit Date</p>
            <input className='profile-input' type='date' name='exitDate' value={profile.exitDate} onChange={onFormChange}></input>
          </div>
        </div>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Address</p>
            <input className='profile-input' type='text' name='address' value={profile.address} onChange={onFormChange}></input>
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>City</p>
            <input className='profile-input' type='text' name='city' value={profile.city} onChange={onFormChange}></input>
          </div>
        </div>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>State</p>
            <select className='profile-select' name='state' value={profile.state} onChange={onFormChange}>
              <option value='0'>Select</option>
              <option value='AL'>AL</option>
              <option value='AK'>AK</option>
              <option value='AZ'>AZ</option>
              <option value='AR'>AR</option>
              <option value='CA'>CA</option>
              <option value='CO'>CO</option>
              <option value='CT'>CT</option>
              <option value='DE'>DE</option>
              <option value='DC'>DC</option>
              <option value='FL'>FL</option>
              <option value='GA'>GA</option>
              <option value='HI'>HI</option>
              <option value='ID'>ID</option>
              <option value='IL'>IL</option>
              <option value='IN'>IN</option>
              <option value='IA'>IA</option>
              <option value='KS'>KS</option>
              <option value='KY'>KY</option>
              <option value='LA'>LA</option>
              <option value='MA'>MA</option>
              <option value='ME'>ME</option>
              <option value='MD'>MD</option>
              <option value='MI'>MI</option>
              <option value='MN'>MN</option>
              <option value='MS'>MS</option>
              <option value='MO'>MO</option>
              <option value='MT'>MT</option>
              <option value='NE'>NE</option>
              <option value='NV'>NV</option>
              <option value='NH'>NH</option>
              <option value='NJ'>NJ</option>
              <option value='NM'>NM</option>
              <option value='NY'>NY</option>
              <option value='NC'>NC</option>
              <option value='ND'>ND</option>
              <option value='OH'>OH</option>
              <option value='OK'>OK</option>
              <option value='OR'>OR</option>
              <option value='PA'>PA</option>
              <option value='RI'>RI</option>
              <option value='SC'>SC</option>
              <option value='SD'>SD</option>
              <option value='TN'>TN</option>
              <option value='TX'>TX</option>
              <option value='UT'>UT</option>
              <option value='VT'>VT</option>
              <option value='VA'>VA</option>
              <option value='WA'>WA</option>
              <option value='WV'>WV</option>
              <option value='WI'>WI</option>
              <option value='WY'>WY</option>
            </select>
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Zipcode</p>
            <input className='profile-input' type='text' name='zipcode' value={profile.zipcode} onChange={onFormChange}></input>
          </div>
        </div>
      </div>
      <div className='profile-save'>
        <button className='profile-save-button' onClick={handleSave}>Save</button>
      </div>
      <div className='profile-password-form'>
        <div className='profile-input-container'>
          <p className='profile-input-label'>New Password</p>
          <input className='profile-input' type='password' name='password' value={password} onChange={onPasswordChange}></input>
        </div>
        <div className='profile-input-container'>
          <p className='profile-input-label'>Confirm New Password</p>
          <input className='profile-input' type='password' name='passwordConfirmation' value={passwordConfirmation} onChange={onPasswordConfirmationChange}></input>
        </div>
      </div>
      <div className='profile-save'>
        <button className='profile-save-button' onClick={handleUpdatePassword}>Update Password</button>
      </div>
    </div>
  );
};
