import './Checkbox.css';
import { ChangeEvent } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  name: string,
  label: string,
  checked: boolean,
  disabled?: boolean,
  onChange?: (name: string, value: unknown) => void
}
 
export const Checkbox = ({ className = '', name, label, checked, disabled, onChange }: Props) => {
  return (
    <div className={`checkbox ${className}`}>
      <p className='checkbox-label'>{label}</p>
      <input
        className='checkbox-element'
        type='checkbox'
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={({ target }: ChangeEvent) => onChange?.((target as HTMLInputElement).name, (target as HTMLInputElement).checked)}
      />
    </div>
  );
};