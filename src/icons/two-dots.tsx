import React from 'react';
import { IconProps } from './types';

const TwoDots: React.FC<IconProps> = ({
  height = '16',
  width = '16',
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <circle cx="128" cy="80" r="20"></circle>
    <circle cx="128" cy="176" r="20"></circle>
  </svg>
);

export default TwoDots;
