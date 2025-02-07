export const getDateWithLocalTimeZone = (date: string) => new Date(date + 'T00:00:00'); // Create date object with local time zone

export { processSSG } from '@utils/ssgProcessor';

export { mapDTOToSSG, mapSSGToDTO, mapDTOToProfile, mapProfileToDTO, mapDTOToMeetingDate, mapMeetingDateToDTO } from '@utils/dbDataMapper';