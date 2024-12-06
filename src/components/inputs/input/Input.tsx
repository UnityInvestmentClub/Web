import './Input.css';
import { ChangeEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  type: 'text' | 'number' | 'date' | 'password' | 'tel',
  name: string,
  label: string,
  value: string | number,
  onChange?: (name: string, value: any) => void
}

export const Input = ({ className = '', type, name, label, value, onChange: onChangeProp }: Props) => {
  const onChange = ({ target }: ChangeEvent) => {
    const { name, value } = target as HTMLInputElement;

    if (type === 'number')
      onChangeProp(name, Number(value));
    else
      onChangeProp(name, value);
  };

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