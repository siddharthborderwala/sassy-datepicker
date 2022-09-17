import React from 'react';

const Badge = ({ href, src, alt }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={src} alt={alt} />
  </a>
);

export default Badge;
