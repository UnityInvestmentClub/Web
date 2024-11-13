import './index.css';
import { useEffect, useState} from 'react';
import { useProfile, useAuth } from '@hooks/';
import { Profile, InputChangeEvent, SelectChangeEvent } from '@_types/';

const initialProfile: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
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
    const loadData = async () => {
      try {
        setProfile(await getProfile());
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, [getProfile]);

  const handleSave = async () => {
    try {
      await updateProfile(profile);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePassword = async () => {
    const symbolRegex = /[$-/:-?{-~!"^_`]/;

    if (
      password !== passwordConfirmation || //password does not match confirmation
      password.length < 6 || //password less than 6 characters
      password === password.toLowerCase() || //password missing upper case character
      password === password.toUpperCase() || //password missing lower case character
      !symbolRegex.test(password) //password missing symbol
    )
      return;

    try {
      await updatePassword(password);
    } catch (e) {
      console.error(e);
    }
  };

  const onFormChange = (e: InputChangeEvent | SelectChangeEvent) => {
    var { name, value } = e.target;
    
    setProfile({ ...profile, [name]: value});
  };

  const onPasswordChange = (e: InputChangeEvent) => {
    setPassword(e.target.value);
  };

  const onPasswordConfirmationChange = (e: InputChangeEvent) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <div className='profile'>
      <div className='profile-form'>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>First Name</p>
            <input className='profile-input' type='text' name='firstName' value={profile.firstName} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Last Name</p>
            <input className='profile-input' type='text' name='lastName' value={profile.lastName} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Join Date</p>
            <input className='profile-input' type='date' name='joinDate' value={profile.joinDate} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Exit Date</p>
            <input className='profile-input' type='date' name='exitDate' value={profile.exitDate} onChange={onFormChange} />
          </div>
        </div>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Email</p>
            <input className='profile-input' type='text' name='email' value={profile.email} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Phone Number</p>
            <input className='profile-input' type='text' name='phoneNumber' value={profile.phoneNumber} onChange={onFormChange} />
          </div>
        </div>
        <div className='profile-row'>
          <div className='profile-input-container'>
            <p className='profile-input-label'>Address</p>
            <input className='profile-input' type='text' name='address' value={profile.address} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>City</p>
            <input className='profile-input' type='text' name='city' value={profile.city} onChange={onFormChange} />
          </div>
          <div className='profile-input-container'>
            <p className='profile-input-label'>State</p>
            <select className='profile-select' name='state' value={profile.state} onChange={onFormChange}>
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
            <input className='profile-input' type='text' name='zipcode' value={profile.zipcode} onChange={onFormChange} />
          </div>
        </div>
      </div>
      <div className='profile-save'>
        <button className='profile-save-button' onClick={handleSave}>Save</button>
      </div>
      <div className='profile-password-form'>
        <div className='profile-input-container'>
          <p className='profile-input-label'>New Password</p>
          <input className='profile-input' type='password' name='password' value={password} onChange={onPasswordChange} />
        </div>
        <div className='profile-input-container'>
          <p className='profile-input-label'>Confirm New Password</p>
          <input className='profile-input' type='password' name='passwordConfirmation' value={passwordConfirmation} onChange={onPasswordConfirmationChange} />
        </div>
      </div>
      <div className='profile-save'>
        <button className='profile-save-button' onClick={handleUpdatePassword}>Update Password</button>
      </div>
    </div>
  );
};
