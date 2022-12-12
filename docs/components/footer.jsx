import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://netlify.com"
        rel="noopener noreferrer"
        target="_blank"
        className={styles['footer--logo']}
      >
        <p>
          Powered By Netlify{' '}
          <img
            src="https://www.netlify.com/v3/img/components/logomark.svg"
            alt="Logo"
            className={styles['footer--logo__img']}
          />
        </p>
      </a>
      <div>MIT {new Date().getFullYear()} © Siddharth Borderwala</div>
    </div>
  );
};

export default Footer;
