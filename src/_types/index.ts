import { ReactNode } from 'react';

export type PropsBase = {
  children: ReactNode;
};

export type ActionBase = {
  type: string;
};

export type EmptyFunction = () => void;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export { type SSG, type SSGDTO } from '@_types/ssg';
export { type Profile, type ProfileDTO } from '@_types/profile';