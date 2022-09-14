import React, { useCallback, useEffect, useRef } from 'react';

type OptionProps<T> = {
  /**
   * If the option is currently selected.
   */
  selected: boolean;
  /**
   * The label to display for the option.
   */
  label: string;
  /**
   * The value of the option.
   */
  value: T;
  /**
   * A callback triggered when the option is clicked.
   */
  onClick: (v: T) => void;
  /**
   * If the option is disabled.
   */
  disabled: boolean;
  /**
   * Handle blur
   */
  handleBlur?: React.FocusEventHandler;
};

/**
 * Custom Option component.
 */
function Option<T extends unknown>({
  selected,
  value,
  label,
  onClick,
  disabled,
  handleBlur,
}: OptionProps<T>): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick(value);
    }
  }, [onClick, disabled, value]);

  useEffect(() => {
    if (selected) {
      ref.current?.focus();
    }

    return () => ref.current?.blur();
  }, [selected]);

  return (
    <button
      key={label}
      ref={ref}
      type="button"
      className={`sassy--option ${selected ? 'sassy--option__active' : ''} ${
        disabled ? 'sassy--option__disabled' : ''
      }`}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default Option;
