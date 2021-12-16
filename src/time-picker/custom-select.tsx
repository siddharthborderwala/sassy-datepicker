import React from 'react';

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  values: string[];
} & React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>;

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  values,
  onChange,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (React.Children.toArray(children).some(c => typeof c !== 'string')) {
      throw new Error('time-picker: CustomSelect children must be strings');
    }
  }, [children]);

  React.useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', clickListener);

    return () => document.removeEventListener('click', clickListener);
  }, []);

  // TODO: optimize the callbacks
  // TODO: uniform value format
  return (
    <div className="stp--select__container" ref={ref}>
      <div
        className="stp--select"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
      >
        {value}
      </div>
      {isOpen && (
        <div className="stp--select__dropdown">
          {values.map(v => (
            <button
              className={`stp--option ${
                value === v ? 'stp--option__active' : ''
              }`}
              type="button"
              onClick={() => {
                onChange(v);
                setIsOpen(false);
              }}
              key={v}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
