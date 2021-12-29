import React from 'react';
import CustomOption from './custom-option';

export type OptionType = {
  value: string[];
  disabled: boolean;
};

type CustomSelectProps = {
  /**
   * The value of the select.
   */
  value: string;
  /**
   * A callback triggered whenever the value of the select changes.
   */
  onChange: (value: string) => void;
  /**
   * The options to display in the select.
   *
   * Format - [{value: [value, label], disabled: boolean}, ...]
   */
  options: OptionType[];
} & Omit<
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>,
  'onChange' | 'value'
>;

/**
 * A custom select component.
 *
 */
const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openOptionsDropdown = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeOptionsDropdown = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOptionSelect = React.useCallback(
    v => {
      onChange(v);
      closeOptionsDropdown();
    },
    [onChange, closeOptionsDropdown]
  );

  React.useEffect(() => {
    if (React.Children.toArray(children).some(c => typeof c !== 'string')) {
      throw new Error('time-picker: CustomSelect children must be strings');
    }
  }, [children]);

  React.useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeOptionsDropdown();
      }
    };

    document.addEventListener('click', clickListener);

    return () => document.removeEventListener('click', clickListener);
  }, [closeOptionsDropdown]);

  return (
    <div className="stp--select__container">
      <div
        ref={ref}
        className="stp--select"
        tabIndex={0}
        onClick={openOptionsDropdown}
        onFocus={openOptionsDropdown}
      >
        {value}
      </div>
      {isOpen && (
        <div className="stp--select__dropdown">
          {options.map(({ value: [v, label], disabled }) => (
            <CustomOption
              key={v}
              selected={v === value}
              value={v}
              label={label}
              onClick={handleOptionSelect}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
