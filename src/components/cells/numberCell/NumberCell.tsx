import './NumberCell.css'
import { ChangeEvent, KeyboardEvent, ClipboardEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import { CellWrapper, useCellContext } from '@silevis/reactgrid';
import { NumericKeys, ControlKeys, PercentFormat } from '@constants/';

interface NumberCellProps {
  value: number;
  onChange?: (newValue: number, colIndex: number) => void;
  format?: Intl.NumberFormat;
  className?: string;
}

const getValueString = (value: number, format?: Intl.NumberFormat) => {
  if (isNaN(value))
    return '';
  
  if (format === PercentFormat)
    return (value * 100).toString();

  return value.toString();
};

export const NumberCell = ({ value: initialValue, onChange, format, className = '' }: NumberCellProps) => {
  const valueString = getValueString(initialValue, format);
  const [value, setValue] = useState(valueString);
  const [isEditMode, setEditMode] = useState(false);
  const ctx = useCellContext();
  const targetInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(valueString);
  }, [valueString]);

  const getValueNumber = (value: string) => {
    if (!value)
      return NaN;

    return Number(value);
  };

  const getDisplayedValue = () => {
    if (format && !isNaN(initialValue))
      return format.format(initialValue);
    return valueString;
  };

  return (
    <CellWrapper
      className={className}
      onStringValueRequested={() => valueString}
      onStringValueReceived={(v: string) => onChange?.(getValueNumber(v), ctx.realColumnIndex)}
      onDoubleClick={() => {
        if (ctx.isFocused) {
          setValue(valueString);
          setEditMode(true);
        }
      }}
      onKeyDown={(event: KeyboardEvent) => {
        if (!isEditMode && (NumericKeys.includes(event.key) || event.key === '.' || event.key === 'Backspace')) {
          setValue('');
          setEditMode(true);
        } else if (!isEditMode && event.key === 'Enter') {
          event.stopPropagation();
          setValue(valueString);
          setEditMode(true);
        }
      }}
    >
      {isEditMode ? (
        <input
          className='cell-input'
          value={value}
          onChange={({ currentTarget }: ChangeEvent) => {
            setValue((currentTarget as HTMLInputElement).value.replace(/[^0-9.-]/g, ''));
          }}
          onBlur={() => {
            onChange?.(getValueNumber(value), ctx.realColumnIndex);
            setEditMode(false);
          }}
          onKeyDown={(event: KeyboardEvent) => {
            if (!ControlKeys.includes(event.key)) {
              event.stopPropagation();
            }
          }}
          onCut={(event: ClipboardEvent) => event.stopPropagation()}
          onCopy={(event: ClipboardEvent) => event.stopPropagation()}
          onPaste={(event: ClipboardEvent) => event.stopPropagation()}
          onPointerDown={(event: PointerEvent) => event.stopPropagation()}
          autoFocus
          ref={targetInputRef}
        />
      ) : (
        getDisplayedValue()
      )}
    </CellWrapper>
  );
};