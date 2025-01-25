import './MultiSelect.css';
import MultiSelectImport, { MultiValue } from 'react-select';
import { PropsBase } from '@_types/';

interface Props<OptionType> extends PropsBase {
  name: string,
  label: string,
  value: OptionType[],
  options: OptionType[],
  getOptionsValue: (option: OptionType) => string,
  getOptionsLabel: (option: OptionType) => string
  error?: boolean,
  disabled?: boolean,
  onChange?: (name: string, value: unknown) => void
}

export const MultiSelect = <OptionType,>({ className = '', name, label, value, options, getOptionsValue, getOptionsLabel, error, disabled, onChange: onChangeProp }: Props<OptionType>) => {
  const onChange = (selected: MultiValue<OptionType>) => {
    onChangeProp?.(name, selected as OptionType[]);
  };

  return (
    <div className={`multiselect ${className}`}>
      <p className='multiselect-label'>{label}</p>
      <MultiSelectImport
        isMulti
        placeholder=''
        onChange={onChange}
        value={value}
        isDisabled={disabled}
        options={options}
        getOptionValue={getOptionsValue}
        getOptionLabel={getOptionsLabel}
        closeMenuOnSelect={false}
        classNames={{
          control: (state) => `multiselect-control ${error ? 'error': ''} ${state.isFocused ? 'focus' : ''}`,
          valueContainer: () => 'multiselect-value-container',
          input: () => 'multiselect-input',
          indicatorsContainer: () => 'multiselect-indicators-container'
        }}
      />
    </div>
  );
};