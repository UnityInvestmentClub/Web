import { useCallback } from 'react';
import { useAppState, useSupabase } from '@hooks/';
import { SSGTable, SSGProfileTable } from '@constants/';
import { mapDTOToSSG, mapSSGToDTO } from '@utils/';
import { SSG, SSGDTO, Preparer } from '@_types/';

export const useSSG = () => {
  const { authId } = useAppState();
  const client = useSupabase();

  const getSSG = useCallback(async (id: string) => {
    var { data, error } = await client.from(SSGTable).select('*, prepared_by: profiles ( id, first_name, last_name ), meeting_date: meeting_dates (meeting_date)').eq('id', id).single();
    
    if (error)
      throw error;

    return mapDTOToSSG(data);
  }, [client]);

  const getSSGs = useCallback(async () => {
    var { data, error } = await client.from(SSGTable).select('*, prepared_by: profiles ( id, first_name, last_name ), meeting_date: meeting_dates (meeting_date)').order('created_date', { ascending: false }).order('stock_ticker');

    if (error)
      throw error;

    return data.map((ssgDTO: SSGDTO) => mapDTOToSSG(ssgDTO));
  }, [client]);

  const createSSG = async (ssg: SSG) => {
    const ssgDTO = {
      ...mapSSGToDTO(ssg),
      created_date: new Date().toISOString(),
      created_by: authId
    };

    // create ssg
    var { data: ssgData, error: ssgError } = await client.from(SSGTable).insert(ssgDTO).select('*').single();

    if (ssgError)
      throw ssgError;

    const ssgProfileDTOs = ssg.preparedBy.map((preparer: Preparer) => ({
      ssg_id: ssgData.id,
      profile_id: preparer.id
    }));

    // create ssg -> profile relationships
    var { error: ssgProfileError } = await client.from(SSGProfileTable).insert(ssgProfileDTOs);

    if (ssgProfileError)
      throw ssgProfileError;
  };

  const updateSSG = async (ssg: SSG) => {
    const ssgDTO = {
      ...mapSSGToDTO(ssg),
      modified_date: new Date().toISOString(),
      modified_by: authId
    };

    // update ssg
    var { error: ssgError } = await client.from(SSGTable).update(ssgDTO).eq('id', ssg.id);

    if (ssgError)
      throw ssgError;

    // get current ssg -> profile relationships
    var { data: ssgProfilesData, error: ssgProfileSelectError } = await client.from(SSGProfileTable).select('*').eq('ssg_id', ssg.id);

    if (ssgProfileSelectError)
      throw ssgProfileSelectError;

    const currentSSGProfileIds = ssgProfilesData.map((ssgProfile: { ssg_id: string, profile_id: string }) => ssgProfile.profile_id);
    const newSSGProfileIds = ssg.preparedBy.map((preparer: Preparer) => preparer.id);

    // find all new ssg -> profile relationships that need to be created
    const ssgProfilesToCreate = newSSGProfileIds.filter(id => !currentSSGProfileIds.includes(id));

    const ssgProfileDTOs = ssgProfilesToCreate.map(id => ({
      ssg_id: ssg.id,
      profile_id: id
    }));

    var { error: ssgProfileInsertError } = await client.from(SSGProfileTable).insert(ssgProfileDTOs);

    if (ssgProfileInsertError)
      throw ssgProfileInsertError;

    // find all ssg -> profile relationships that need to be deleted
    const ssgProfilesToDelete = currentSSGProfileIds.filter(id => !newSSGProfileIds.includes(id));

    var { error: ssgProfileDeletError } = await client.from(SSGProfileTable).delete().eq('ssg_id', ssg.id).in('profile_id', ssgProfilesToDelete);

    if (ssgProfileDeletError)
      throw ssgProfileDeletError;
};

  return {
    getSSGs,
    getSSG,
    createSSG,
    updateSSG
  };
};