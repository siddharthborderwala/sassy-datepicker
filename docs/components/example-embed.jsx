import React, { useRef } from 'react';
import { ArrowsOutSimple } from 'phosphor-react';
import styles from './example-embed.module.css';

const ExampleEmbed = ({ src, title }) => {
  const ref = useRef(null);

  const handleFullScreenRequest = () => {
    if (!ref.current) return;
    ref.current.requestFullscreen();
  };

  return (
    <div className={styles['example-embed--container']}>
      <style>{`
        html.dark .hov-style:hover {
          background-color: #474747af;
        }
        html.light .hov-style:hover {
          background-color: #dbdbdbaf;
        }
      `}</style>
      <button
        className={`hov-style ${styles['example-embed--fs-btn']}`}
        onClick={handleFullScreenRequest}
        type="button"
      >
        <span>Full Screen</span>
        <ArrowsOutSimple />
      </button>
      <iframe
        title={title}
        ref={ref}
        src={src}
        className={styles['example-embed']}
        allowFullScreen
      />
    </div>
  );
};

export default ExampleEmbed;
