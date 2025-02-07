import './Button.css';
import { useState } from 'react';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  type?: 'submit',
  disabled?: boolean,
  onClick?: () => void
}
 
export const Button = ({ className = '', children, type, disabled = false, onClick: onClickProp }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked(true);

    onClickProp?.();

    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      className={`button ${className} ${isClicked ? 'clicked' : ''}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};