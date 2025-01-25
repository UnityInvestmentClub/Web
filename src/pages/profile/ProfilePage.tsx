import './ProfilePage.css';
import { FormEvent, useEffect, useState} from 'react';
import { ValidationError, object, string, date, ref as yupRef, InferType } from 'yup';
import { Input, Select, LoadingSpinner } from '@components/';
import { useProfile, useAuth } from '@hooks/';
import { Profile } from '@_types/';

const initialProfile = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  joinDate: '',
  address: '',
  city: '',
  state: '',
  zipcode: ''
} as Profile;

const initialProfileFormError = {
  firstName: false,
  lastName: false,
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
            <option key='' value=''>Select a State</option>
            <option key='AL' value='AL'>AL</option>
            <option key='AK' value='AK'>AK</option>
            <option key='AZ' value='AZ'>AZ</option>
            <option key='AR' value='AR'>AR</option>
            <option key='CA' value='CA'>CA</option>
            <option key='CO' value='CO'>CO</option>
            <option key='CT' value='CT'>CT</option>
            <option key='DE' value='DE'>DE</option>
            <option key='DC' value='DC'>DC</option>
            <option key='FL' value='FL'>FL</option>
            <option key='GA' value='GA'>GA</option>
            <option key='HI' value='HI'>HI</option>
            <option key='ID' value='ID'>ID</option>
            <option key='IL' value='IL'>IL</option>
            <option key='IN' value='IN'>IN</option>
            <option key='IA' value='IA'>IA</option>
            <option key='KS' value='KS'>KS</option>
            <option key='KY' value='KY'>KY</option>
            <option key='LA' value='LA'>LA</option>
            <option key='MA' value='MA'>MA</option>
            <option key='ME' value='ME'>ME</option>
            <option key='MD' value='MD'>MD</option>
            <option key='MI' value='MI'>MI</option>
            <option key='MN' value='MN'>MN</option>
            <option key='MS' value='MS'>MS</option>
            <option key='MO' value='MO'>MO</option>
            <option key='MT' value='MT'>MT</option>
            <option key='NE' value='NE'>NE</option>
            <option key='NV' value='NV'>NV</option>
            <option key='NH' value='NH'>NH</option>
            <option key='NJ' value='NJ'>NJ</option>
            <option key='NM' value='NM'>NM</option>
            <option key='NY' value='NY'>NY</option>
            <option key='NC' value='NC'>NC</option>
            <option key='ND' value='ND'>ND</option>
            <option key='OH' value='OH'>OH</option>
            <option key='OK' value='OK'>OK</option>
            <option key='OR' value='OR'>OR</option>
            <option key='PA' value='PA'>PA</option>
            <option key='RI' value='RI'>RI</option>
            <option key='SC' value='SC'>SC</option>
            <option key='SD' value='SD'>SD</option>
            <option key='TN' value='TN'>TN</option>
            <option key='TX' value='TX'>TX</option>
            <option key='UT' value='UT'>UT</option>
            <option key='VT' value='VT'>VT</option>
            <option key='VA' value='VA'>VA</option>
            <option key='WA' value='WA'>WA</option>
            <option key='WV' value='WV'>WV</option>
            <option key='WI' value='WI'>WI</option>
            <option key='WY' value='WY'>WY</option>
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
