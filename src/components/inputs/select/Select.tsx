import './Select.css';
import { ChangeEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  name: string,
  label: string,
  value: string | number,
  onChange?: (event: ChangeEvent) => void
}
 
export const Select = ({ className = '', name, label, value, onChange, children }: Props) => {
  return (
    <div className={`select ${className}`}>
      <p className='select-label'>{label}</p>
      <select
        className='select-element'
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};