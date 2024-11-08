import { useCallback } from 'react';
import { useAppState, useSupabase } from '@hooks/';
import { Profile, ProfileDTO } from '@_types/';

const convertDTOToProfile = (data: ProfileDTO) => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    joinDate: data.join_date?.toString() ?? '',
    exitDate: data.exit_date?.toString() ?? '',
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode
  };
};

const convertProfileToDTO = (profile: Profile) => {
  return {
    first_name: profile.firstName,
    last_name: profile.lastName,
    email: profile.email,
    phone_number: profile.phoneNumber,
    join_date: new Date(profile.joinDate),
    exit_date: new Date(profile.exitDate),
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipcode: profile.zipcode
  };
};

export const useProfile = () => {
  const { authId } = useAppState();
  const client = useSupabase();

  const getProfiles = useCallback(async (): Promise<Profile[]> => {
    var { data, error } = await client.from('profiles').select('*').order('created_date', { ascending: false });

    if (error)
      throw error;

    return data.map((profileDTO: ProfileDTO) => convertDTOToProfile(profileDTO));
  }, [client]);

  const getProfile = useCallback(async (): Promise<Profile> => {
    var { data, error } = await client.from('profiles').select('*').eq('auth_id', authId).single();

    if (error)
      throw error;

    return convertDTOToProfile(data);
  }, [authId, client]);

  const updateProfile = async (profile: Profile) => {
    const profileDTO = {
      ...convertProfileToDTO(profile),
      modified_date: new Date().toISOString(),
      modified_by: authId
    };

    var { error } = await client.from('profiles').update(profileDTO).eq('id', profile.id);

    if (error)
      throw error;
  };

  return {
    getProfiles,
    getProfile,
    updateProfile
  };
};