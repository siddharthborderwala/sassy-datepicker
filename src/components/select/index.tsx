import React, {
  Children,
  HTMLProps,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomOption from './option';

import './styles.css';

export type OptionType<T> = {
  value: T;
  label: string;
  disabled: boolean;
};

type CustomSelectProps<T> = {
  /**
   * The value of the select.
   */
  value: T;
  /**
   * A callback triggered whenever the value of the select changes.
   */
  onChange: (value: T) => void;
  /**
   * The options to display in the select.
   *
   * Format - [{value: [value, label], disabled: boolean}, ...]
   */
  options: OptionType<T>[];
  /**
   * If this input element is disabled
   */
  disabled?: boolean;
} & Omit<
  PropsWithChildren<HTMLProps<HTMLDivElement>>,
  'onChange' | 'value' | 'disabled'
>;

/**
 * A custom select component.
 *
 */
function CustomSelect<T>({
  value,
  options,
  onChange,
  children,
  className,
  disabled,
}: CustomSelectProps<T>): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openOptionsDropdown = useCallback(() => {
    if (!disabled) setIsOpen(true);
  }, [setIsOpen, disabled]);

  const closeOptionsDropdown = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOptionSelect = useCallback(
    (v) => {
      onChange(v);
      closeOptionsDropdown();
    },
    [onChange, closeOptionsDropdown]
  );

  const showDropDown = useMemo(() => isOpen && !disabled, [isOpen, disabled]);

  useEffect(() => {
    if (Children.toArray(children).some((c) => typeof c !== 'string')) {
      throw new Error('CustomSelect children must be strings');
    }
  }, [children]);

  useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeOptionsDropdown();
      }
    };

    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, [closeOptionsDropdown, ref]);

  return (
    <div
      tabIndex={-1}
      className={`sassy--select__container ${className ?? ''}`}
      ref={ref}
    >
      <p
        className={`sassy--select ${disabled ? 'sassy--select__disabled' : ''}`}
        tabIndex={disabled ? -1 : 0}
        onClick={openOptionsDropdown}
        onFocus={openOptionsDropdown}
      >
        {value}
      </p>
      {showDropDown && (
        <div className="sassy--select__dropdown">
          {options.map(({ value: currValue, label, disabled }) => (
            <CustomOption
              key={label}
              selected={currValue === value}
              value={currValue}
              label={label}
              onClick={handleOptionSelect}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
