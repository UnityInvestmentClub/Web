import { useCallback } from 'react';
import { useAppState, useSupabase } from '@hooks/';
import { ProfileTable } from '@constants/';
import { Profile, ProfileDTO } from '@_types/';

const convertDTOToProfile = (data: ProfileDTO) => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    joinDate: data.join_date?.toString() ?? '',
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode
  } as Profile;
};

const convertProfileToDTO = (profile: Profile) => {
  return {
    first_name: profile.firstName,
    last_name: profile.lastName,
    email: profile.email,
    phone_number: profile.phoneNumber,
    join_date: new Date(profile.joinDate),
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zipcode: profile.zipcode
  } as ProfileDTO;
};

export const useProfile = () => {
  const { authId } = useAppState();
  const client = useSupabase();

  const getProfiles = useCallback(async (): Promise<Profile[]> => {
    var { data, error } = await client.from(ProfileTable).select('*').order('first_name');

    if (error)
      throw error;

    return data.map((profileDTO: ProfileDTO) => convertDTOToProfile(profileDTO));
  }, [client]);

  const getProfile = useCallback(async (id: string): Promise<Profile> => {
    var { data, error } = await client.from(ProfileTable).select('*').eq('id', id).single();

    if (error)
      throw error;

    return convertDTOToProfile(data);
  }, [client]);

  const getOwnProfile = useCallback(async (): Promise<Profile> => {
    var { data, error } = await client.from(ProfileTable).select('*').eq('id', authId).single();

    if (error)
      throw error;

    return convertDTOToProfile(data);
  }, [authId, client]);

  const updateProfile = async (profile: Profile) => {
    const profileDTO = convertProfileToDTO(profile);

    var { error } = await client.from(ProfileTable).update(profileDTO).eq('id', profile.id);

    if (error)
      throw error;
  };

  return {
    getProfiles,
    getProfile,
    getOwnProfile,
    updateProfile
  };
};