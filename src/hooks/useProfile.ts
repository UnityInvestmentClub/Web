import { useCallback } from 'react';
import { useAppState, useSupabase } from '@hooks/';
import { ProfileTable } from '@constants/';
import { mapDTOToProfile, mapProfileToDTO } from '@utils/';
import { Profile, ProfileDTO } from '@_types/';

export const useProfile = () => {
  const { authId } = useAppState();
  const client = useSupabase();

  const getProfiles = useCallback(async (): Promise<Profile[]> => {
    var { data, error } = await client.from(ProfileTable).select('*').order('first_name');

    if (error)
      throw error;

    return data.map((profileDTO: ProfileDTO) => mapDTOToProfile(profileDTO));
  }, [client]);

  const getProfile = useCallback(async (id: string): Promise<Profile> => {
    var { data, error } = await client.from(ProfileTable).select('*').eq('id', id).single();

    if (error)
      throw error;

    return mapDTOToProfile(data);
  }, [client]);

  const getOwnProfile = useCallback(async (): Promise<Profile> => {
    var { data, error } = await client.from(ProfileTable).select('*').eq('id', authId).single();

    if (error)
      throw error;

    return mapDTOToProfile(data);
  }, [authId, client]);

  const updateProfile = async (profile: Profile) => {
    const profileDTO = mapProfileToDTO(profile);

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