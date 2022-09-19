import React from 'react';
import styles from './footer.module.css';

const VercelIcon = () => {
  return (
    <svg
      height="16"
      viewBox="0 0 1155 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
    </svg>
  );
};

const Footer = () => {
  return (
    <div className={styles['footer']}>
      <a
        src="https://vercel.com?utm_source=[team-name]&utm_campaign=oss"
        rel="noopener noreferrer"
        target="_blank"
        className={styles['footer--vercel']}
      >
        <VercelIcon />
        <div className={styles['footer--vercel__divider']}>&nbsp;</div>
        <p>Powered By Vercel</p>
      </a>
      <div>MIT {new Date().getFullYear()} © Siddharth Borderwala</div>
    </div>
  );
};

export default Footer;
