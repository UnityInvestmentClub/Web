import { ChangeEvent, KeyboardEvent, ClipboardEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import { CellWrapper, useCellContext } from '@silevis/reactgrid';
import { NumericKeys, ControlKeys, PercentFormat } from '@constants/';

interface NumberCellProps {
  value: number;
  onValueChanged: (newValue: number) => void;
  format?: Intl.NumberFormat;
  style?: React.CSSProperties;
}

const getValueString = (value: number, format?: Intl.NumberFormat) => {
  if (isNaN(value))
    return '';
  
  if (format === PercentFormat)
    return (value * 100).toString();

  return value.toString();
};

export const NumberCell = ({ value: initialValue, onValueChanged, format }: NumberCellProps) => {
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
      onStringValueRequested={() => valueString}
      onStringValueReceived={(v: string) => onValueChanged?.(getValueNumber(v))}
      onDoubleClick={() => {
        if (ctx.isFocused) {
          setValue(valueString);
          setEditMode(true);
        }
      }}
      onKeyDown={({ key }: KeyboardEvent) => {
        if (!isEditMode && (NumericKeys.includes(key) || key === '.' || key === 'Backspace')) {
          setValue('');
          setEditMode(true);
        }
      }}
    >
      {isEditMode ? (
        <input
          // className='cell-input'
          value={value}
          onChange={({ currentTarget }: ChangeEvent) => {
            setValue((currentTarget as HTMLInputElement).value.replace(/[^0-9.-]/g, ''));
          }}
          onBlur={() => {
            onValueChanged?.(getValueNumber(value));
            setEditMode(false);
          }}
          onKeyDown={(event: KeyboardEvent) => {
            if (!ControlKeys.includes(event.key)) {
              event.stopPropagation();
            }

            if (event.key === 'Escape') {
              setEditMode(false);
            } else if (event.key === 'Enter') {
              onValueChanged?.(getValueNumber(value));
              setEditMode(false);
            }
          }}
          onCut={(event: ClipboardEvent) => event.stopPropagation()}
          onCopy={(event: ClipboardEvent) => event.stopPropagation()}
          onPaste={(event: ClipboardEvent) => event.stopPropagation()}
          onPointerDown={(event: PointerEvent) => event.stopPropagation()}
          style={inputStyle}
          autoFocus
          ref={targetInputRef}
        />
      ) : (
        getDisplayedValue()
      )}
    </CellWrapper>
  );
};

const inputStyle: React.CSSProperties = {
  resize: "none",
  overflowY: "hidden",
  boxSizing: "border-box",
  textAlign: "center",
  width: "100%",
  height: "100%",
  background: "transparent",
  border: "none",
  padding: 0,
  outline: "none",
  color: "inherit",
  fontSize: "inherit",
  fontFamily: "inherit",
};