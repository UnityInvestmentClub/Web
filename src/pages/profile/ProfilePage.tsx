import './ProfilePage.css';
import { FormEvent, useEffect, useState} from 'react';
import { ValidationError, object, string, date, ref as yupRef, InferType } from 'yup';
import { Input, Select, LoadingSpinner } from '@components/';
import { useProfile, useAuth } from '@hooks/';
import { Profile } from '@_types/';

const initialProfile: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  joinDate: '',
  address: '',
  city: '',
  state: '',
  zipcode: ''
};

const initialProfileFormError = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  joinDate: false,
  address: false,
  city: false,
  state: false,
  zipcode: false
}

const profileSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  phoneNumber: string().required(),
  joinDate: date().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  zipcode: string().required()
});

const passwordSchema = object({
  password: string()
    .min(6, 'Password must have at least 6 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain a special character')
    .required('Password is required'),
  passwordConfirmation: string()
    .oneOf([yupRef('password'), null], 'Passwords must match')
});

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState(initialProfile);

  const [profileFormError, setProfileFormError] = useState(initialProfileFormError);
  const [profileSaveError, setProfileSaveError] = useState(null);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(null);

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [passwordFormError, setPasswordFormError] = useState(null);
  const [passwordFormSuccess, setPasswordFormSuccess] = useState(null);

  const { getOwnProfile, updateProfile } = useProfile();
  const { updatePassword } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setProfile(await getOwnProfile());

        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, [getOwnProfile]);

  const onProfileFormChange = (name: string, value: unknown) => {
    setProfile(profile => ({ ...profile, [name]: value }));

    const inputSchema = profileSchema.pick([name as keyof InferType<typeof profileSchema>]);
    const isInputValid = inputSchema.isValidSync({ [name]: value });
    setProfileFormError(profileFormError => ({ ...profileFormError, [name]: !isInputValid }));

    if (profileSaveError && profileSchema.isValidSync({ ...profile, [name]: value }))
      setProfileSaveError(null);

    setProfileSaveSuccess(null);
  };

  const handleProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      profileSchema.validateSync(profile, { abortEarly: false });
      
      await updateProfile(profile);

      setProfileSaveSuccess('Profile updated!');
    } catch (error) {
      if (error instanceof ValidationError) {
        var errors = { };

        for (const innerError of error.inner) {
          errors = { ...errors, [innerError.path]: true };
        }
        
        setProfileFormError(profileFormError => ({ ...profileFormError, ...errors }));
      }

      setProfileSaveError('Something went wrong! Check everything is entered correctly');
    }
  };

  const onPasswordChange = (_: string, value: unknown) => {
    setPassword(value as string);

    if (passwordSchema.isValidSync({ password: value, passwordConfirmation }))
      setPasswordFormError(null);
    
    setPasswordFormSuccess(null);
  };

  const onPasswordConfirmationChange = (_: string, value: unknown) => {
    setPasswordConfirmation(value as string);

    if (passwordSchema.isValidSync({ passwordConfirmation: value, password }))
      setPasswordFormError(null);
    
    setPasswordFormSuccess(null);
  };

  const handlePasswordUpdate = async (event: FormEvent) => {
    event.preventDefault();

    try {
      passwordSchema.validateSync({ password, passwordConfirmation });

      await updatePassword(password);

      setPasswordFormSuccess('Password updated!');
    } catch (error) {
      if (error instanceof ValidationError) {
        setPasswordFormError(error.message);
      } else {
        setPasswordFormError('Something went wrong! Check everything is entered correctly');
      }
    }
  };

  return isLoading
    ? (<LoadingSpinner />)
    : (<div className='profile'>
      <form className='profile-form' onSubmit={handleProfileSubmit}>
        <div className='profile-row'>
          <Input className='profile-form-input' type='text' name='firstName' label='First Name' value={profile.firstName} error={profileFormError.firstName} onChange={onProfileFormChange}/>
          <Input className='profile-form-input' type='text' name='lastName' label='Last Name' value={profile.lastName} error={profileFormError.lastName} onChange={onProfileFormChange}/>
          <Input className='profile-form-input' type='text' name='phoneNumber' label='Phone Number' value={profile.phoneNumber} error={profileFormError.phoneNumber} onChange={onProfileFormChange}/>
          <Input className='profile-form-input' type='date' name='joinDate' label='Join Date' value={profile.joinDate} error={profileFormError.joinDate} onChange={onProfileFormChange}/>
        </div>
        <div className='profile-row'>
          <Input className='profile-form-input' type='text' name='address' label='Address' value={profile.address} error={profileFormError.address} onChange={onProfileFormChange}/>
          <Input className='profile-form-input' type='text' name='city' label='City' value={profile.city} error={profileFormError.city} onChange={onProfileFormChange}/>
          <Select className='profile-form-input' name='state' label='State' value={profile.state} error={profileFormError.state} onChange={onProfileFormChange}>
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
          </Select>
          <Input className='profile-form-input' type='text' name='zipcode' label='Zipcode' value={profile.zipcode} error={profileFormError.zipcode} onChange={onProfileFormChange}/>
        </div>
        
        <button className='profile-save-button' type='submit'>Save</button>
        {profileSaveSuccess && <p className='profile-success'>{profileSaveSuccess}</p>}
        {profileSaveError && <p className='profile-error'>{profileSaveError}</p>}
      </form>

      <form className='profile-password-form' onSubmit={handlePasswordUpdate}>
        <Input className='profile-password-input' type='password' name='password' label='New Password' value={password} onChange={onPasswordChange}/>
        <Input className='profile-password-input' type='password' name='passwordConfirmation' label='Confirm New Password' value={passwordConfirmation} onChange={onPasswordConfirmationChange}/>
        
        <button className='profile-save-button' type='submit'>Update Password</button>
        {passwordFormSuccess && <p className='profile-success'>{passwordFormSuccess}</p>}
        {passwordFormError && <p className='profile-error'>{passwordFormError}</p>}
      </form>
    </div>);
};
