import './Input.css';
import { ChangeEvent, KeyboardEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  type: 'text' | 'number' | 'date' | 'password' | 'tel',
  name: string,
  label?: string,
  value: string | number,
  error?: boolean,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onChange?: (name: string, value: any) => void
}

export const Input = ({ className = '', type, name, label, value, error, onChange: onChangeProp }: Props) => {
  const onChange = ({ target }: ChangeEvent) => {
    const { name, value } = target as HTMLInputElement;

    if (type === 'number' && value !== '')
      onChangeProp?.(name, Number(value));
    else
      onChangeProp?.(name, value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
      event.preventDefault();
  }
  
  return (
    <div className={`input ${className}`}>
      {label && <p className='input-label'>{label}</p>}
      <input
        className={`input-element ${error ? 'error' : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};