import './Select.css';
import { ChangeEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  name: string,
  label: string,
  value: string | number,
  error?: boolean,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onChange?: (name: string, value: any) => void
}
 
export const Select = ({ className = '', name, label, value, error, onChange: onChangeProp, children }: Props) => {
  const onChange = ({ target }: ChangeEvent) => {
    const { name, value } = target as HTMLInputElement;

    onChangeProp?.(name, value);
  };

  return (
    <div className={`select ${className}`}>
      <p className='select-label'>{label}</p>
      <select
        className={`select-element ${error ? 'error' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};