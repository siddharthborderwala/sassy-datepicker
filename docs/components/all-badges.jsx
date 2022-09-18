import React from 'react';
import Badge from './badge';
import styles from './all-badges.module.css';

const AllBadges = () => (
  <div className={styles.badges}>
    <Badge
      href="https://npmjs.org/package/sassy-datepicker"
      src="https://badge.fury.io/js/sassy-datepicker.svg"
      alt="NPM Version"
    />
    <Badge
      href="https://github.com/sassy-labs/datepicker/actions/workflows/main.yml"
      src="https://github.com/sassy-labs/datepicker/actions/workflows/main.yml/badge.svg"
      alt="CI Status"
    />
    <Badge
      href="https://github.com/sassy-labs/datepicker#maintenance-status"
      src="https://badgen.net/badge/maintenance/active/green"
      alt="Maintenance Status"
    />
    <Badge
      href="https://bundlephobia.com/package/sassy-datepicker"
      src="https://img.shields.io/bundlephobia/minzip/sassy-datepicker@0.10.1?color=blue&label=minzip"
      alt="Bundle Size: Minified + Gzipped"
    />
    <Badge
      href="https://github.com/sassy-labs/datepicker/issues"
      src="https://badgen.net/badge/issues/chat%20with%20us/blue"
      alt="GitHub Issues"
    />
    <Badge
      href="https://github.com/sassy-labs/datepicker/pulls"
      src="https://img.shields.io/badge/PRs-welcome-blue.svg"
      alt="PRs Welcome"
    />
  </div>
);

export default AllBadges;
