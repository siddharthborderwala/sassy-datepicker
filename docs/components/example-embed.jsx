import React, { useRef } from 'react';
import { Bleed } from 'nextra-theme-docs';
import { ArrowsOutSimple } from 'phosphor-react';
import styles from './example-embed.module.css';

const ExampleEmbed = ({ src }) => {
  const ref = useRef(null);

  const handleFullScreenRequest = () => {
    if (!ref.current) return;
    ref.current.requestFullscreen();
  };

  return (
    <div className={styles['example-embed--container']}>
      <button
        className={styles['example-embed--fs-btn']}
        onClick={handleFullScreenRequest}
      >
        <span>Full Screen</span>
        <ArrowsOutSimple />
      </button>
      <iframe
        ref={ref}
        src={src}
        className={styles['example-embed']}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ExampleEmbed;
