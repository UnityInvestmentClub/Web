import './FixedCell.css'
import { CellWrapper } from '@silevis/reactgrid';
import { PropsBase } from '@_types/';

interface Props extends PropsBase {
  value: string;
  format?: Intl.NumberFormat;
}

export const FixedCell = ({ value, format, className = '' }: Props) => {
  const getDisplayedValue = () => {
    if (format && Number(value))
      return format.format(Number(value));
    
    return value;
  };

  return (
    <CellWrapper className={className} onStringValueRequested={() => value?.toString() ?? ''} onStringValueReceived={() => {}}>
      {getDisplayedValue()}
    </CellWrapper>
  );
};