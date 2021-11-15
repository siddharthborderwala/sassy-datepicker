import * as React from 'react';

type DateButtonProps = {
  date: Date;
  active: boolean;
  selected: boolean;
  onClick: (date: Date) => void;
};

const DateButton: React.FC<DateButtonProps> = ({
  date,
  active,
  onClick,
  selected,
}) => (
  <button
    className={`sdp--square-btn sdp--date-btn ${
      selected ? 'sdp--date-btn__selected' : ''
    } sdp--text ${!active ? 'sdp--text__inactive' : ''}`}
    onClick={() => onClick(date)}
    tabIndex={active ? 0 : -1}
  >
    {date.getDate()}
  </button>
);

export default React.memo(
  DateButton,
  (p, n) =>
    p.date.getDay() === n.date.getDay() &&
    p.active === n.active &&
    p.selected === n.selected
);
