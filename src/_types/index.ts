import { ReactNode } from 'react';

export type PropsBase = {
  className?: string;
  children?: ReactNode;
};

export type ActionBase = {
  type: string;
};

export { type SSG, type SSGDTO, type Preparer, type PreparerDTO } from '@_types/dbTypes/ssg';
export { type Profile, type ProfileDTO } from '@_types/dbTypes/profile';
export { type MeetingDate, type MeetingDateDTO } from '@_types/dbTypes/meetingDate';