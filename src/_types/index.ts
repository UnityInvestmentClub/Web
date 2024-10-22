import { ReactNode } from 'react';

export type PropsBase = {
  children: ReactNode;
};

export type ActionBase = {
  type: string;
};

export type EmptyFunction = () => void;