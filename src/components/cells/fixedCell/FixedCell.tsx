import './FixedCell.css'
import { CellWrapper } from '@silevis/reactgrid';

interface FixedCellProps {
  value: string;
  format?: Intl.NumberFormat;
  className?: string;
}

export const FixedCell = ({ value, format, className = '' }: FixedCellProps) => {
  const getDisplayedValue = () => {
    if (format && Number(value))
      return format.format(Number(value));
    
    return value;
  };

  return (
    <CellWrapper className={className} onStringValueRequested={() => value?.toString() || ''} onStringValueReceived={() => {}}>
      {getDisplayedValue()}
    </CellWrapper>
  );
};