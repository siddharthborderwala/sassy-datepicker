import React from 'react';

type CustomOptionProps = {
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
  value: string;
  /**
   * A callback triggered when the option is clicked.
   */
  onClick: (v: string) => void;
  /**
   * If the option is disabled.
   */
  disabled: boolean;
};

/**
 * Custom Option component.
 */
const CustomOption: React.FC<CustomOptionProps> = ({
  selected,
  value,
  label,
  onClick,
  disabled,
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView();
    }
  }, [selected]);

  return (
    <button
      ref={ref}
      className={`stp--option ${selected ? 'stp--option__active' : ''} ${
        disabled ? 'stp--option__disabled' : ''
      }`}
      type="button"
      onClick={() => !disabled && onClick(value)}
      key={value}
    >
      {label}
    </button>
  );
};

export default CustomOption;
