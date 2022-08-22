import React from 'react';

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
};

/**
 * Custom Option component.
 */
function Option<T>({
  selected,
  value,
  label,
  onClick,
  disabled,
}: OptionProps<T>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const handClick = React.useCallback(() => {
    if (!disabled) {
      onClick(value);
    }
  }, [onClick, disabled, value]);

  React.useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView();
    }
  }, [selected]);

  return (
    <button
      ref={ref}
      className={`sassy--option ${selected ? 'sassy--option__active' : ''} ${
        disabled ? 'sassy--option__disabled' : ''
      }`}
      type="button"
      onClick={handClick}
      key={label}
    >
      {label}
    </button>
  );
}

export default Option;
