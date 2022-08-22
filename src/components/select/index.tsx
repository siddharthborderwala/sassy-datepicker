import React from 'react';
import CustomOption from './option';

import './styles.css';

export type OptionType<T> = {
  value: [T, string];
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
} & Omit<
  React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>,
  'onChange' | 'value'
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
}: CustomSelectProps<T>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openOptionsDropdown = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeOptionsDropdown = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOptionSelect = React.useCallback(
    (v) => {
      onChange(v);
      closeOptionsDropdown();
    },
    [onChange, closeOptionsDropdown]
  );

  React.useEffect(() => {
    if (React.Children.toArray(children).some((c) => typeof c !== 'string')) {
      throw new Error('CustomSelect children must be strings');
    }
  }, [children]);

  React.useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeOptionsDropdown();
      }
    };

    const blurListener = (e: FocusEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeOptionsDropdown();
      }
    };

    document.addEventListener('click', clickListener);
    ref.current?.addEventListener('focusout', blurListener);

    return () => {
      document.removeEventListener('click', clickListener);
      ref.current?.removeEventListener('focusout', blurListener);
    };
  }, [closeOptionsDropdown, ref]);

  return (
    <div
      tabIndex={-1}
      className={`sassy--select__container ${className ?? ''}`}
      ref={ref}
    >
      <p
        className="sassy--select"
        tabIndex={0}
        onClick={openOptionsDropdown}
        onFocus={openOptionsDropdown}
      >
        {value}
      </p>
      {isOpen && (
        <div className="sassy--select__dropdown">
          {options.map(({ value: [v, label], disabled }) => (
            <CustomOption
              key={label}
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
}

export default CustomSelect;
