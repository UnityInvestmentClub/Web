import './Input.css';
import { ChangeEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  type: 'text' | 'number' | 'date' | 'password' | 'tel',
  name: string,
  label: string,
  value: string | number,
  onChange?: (event: ChangeEvent) => void
}
 
export const Input = ({ className = '', type, name, label, value, onChange }: Props) => {
  return (
    <div className={`input ${className}`}>
      <p className='input-label'>{label}</p>
      <input
        className='input-element'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};