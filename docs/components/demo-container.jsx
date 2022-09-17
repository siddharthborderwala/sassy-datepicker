import React from 'react';
import styles from './demo-container.module.css';

const DemoContainer = ({ children }) => (
  <div className={styles['demo-container']}>{children}</div>
);

export default DemoContainer;
