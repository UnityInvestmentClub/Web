import { ReactNode } from 'react';

export type PropsBase = {
  className?: string;
  children?: ReactNode;
};

export type ActionBase = {
  type: string;
};

export { type SSG, type SSGDTO, type Preparer, type PreparerDTO, type SSGDataField, type SSGFormField } from '@_types/ssg';
export { type Profile, type ProfileDTO, type ProfileFormField } from '@_types/profile';