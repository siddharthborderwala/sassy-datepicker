import React from 'react';
import { IconProps } from './types';

const RightCaret: React.FC<IconProps> = ({
  height = '16',
  width = '16',
  color = 'currentColor',
  strokeWidth = '24',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <polyline
      points="96 48 176 128 96 208"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    ></polyline>
  </svg>
);

export default RightCaret;
