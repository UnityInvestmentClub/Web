import { useCallback } from 'react';
import { useSupabase } from '@hooks/';
import { MeetingDateTable } from '@constants/';
import { mapDTOToMeetingDate } from '@utils/';
import { MeetingDate, MeetingDateDTO } from '@_types/';

export const useMeetingDate = () => {
  const client = useSupabase();

  const getMeetingDates = useCallback(async (): Promise<MeetingDate[]> => {
    var { data, error } = await client.from(MeetingDateTable).select('*').order('meeting_date');

    if (error)
      throw error;

    return data.map((meetingDateDTO: MeetingDateDTO) => mapDTOToMeetingDate(meetingDateDTO));
  }, [client]);

  return { getMeetingDates };
};