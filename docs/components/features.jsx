import React from 'react';
import {
  Sparkle,
  Cards,
  CodeSimple,
  PencilSimpleLine,
  Wheelchair,
  Package,
  Lightning,
  FileTs,
} from 'phosphor-react';
import styles from './features.module.css';

const FeatureItem = ({ Icon, label }) => (
  <div className={styles['features--item']}>
    <Icon className={styles['features--item__icon']} />
    <h3 className={styles['features--item__label']}>{label}</h3>
  </div>
);

const Features = () => (
  <div className={styles.features}>
    <FeatureItem Icon={Sparkle} label="Beautiful" />
    <FeatureItem Icon={PencilSimpleLine} label="Customizable" />
    <FeatureItem Icon={Wheelchair} label="Accessible" />
    <FeatureItem Icon={Cards} label="Smooth Transitions" />
    <FeatureItem Icon={CodeSimple} label="Simple API" />
    <FeatureItem Icon={Lightning} label="Extremely Fast" />
    <FeatureItem Icon={Package} label="Small Bundle" />
    <FeatureItem Icon={FileTs} label="TypeScript Support" />
  </div>
);

export default Features;
