<div align="center">
<h1>sassy-datepicker</h1>

[![npm version](https://badge.fury.io/js/sassy-datepicker.svg)](https://badge.fury.io/js/sassy-datepicker)
[![CI Status](https://github.com/sassy-labs/datepicker/actions/workflows/main.yml/badge.svg)](https://github.com/sassy-labs/datepicker/actions/workflows/main.yml)
[![Maintenance Status](https://badgen.net/badge/maintenance/active/green)](https://github.com/sassy-labs/datepicker#maintenance-status)
[![Bundle Size: Minified + Gzipped](https://img.shields.io/bundlephobia/minzip/sassy-datepicker@0.10.1?color=blue&label=minzip)](https://bundlephobia.com/package/sassy-datepicker)
[![GitHub Issues: Chat With Us](https://badgen.net/badge/issues/chat%20with%20us/blue)](https://github.com/sassy-labs/datepicker/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/sassy-labs/datepicker/pulls)

Beautiful, minimal, customizable and accessible date-picker and time-picker for react.

<img width="300" alt="Sassy DatePicker Snapshot" src="https://user-images.githubusercontent.com/54456279/190423366-2516815f-1c4e-4b8b-979d-e722305a1de7.png">

</div>

Why use sassy-datepicker?

- Beautiful picker
- Smooth and slick transitions
- Simple and Easy to Use
- Fully Customizable
- First Class Accessibility
- Small bundle size
- Extremely Performant

## Contents

- [Contents](#contents)
- [Installation and Usage](#installation-and-usage)
  - [Package Installation](#package-installation)
  - [Basic Usage](#basic-usage)
- [Documentation](#documentation)

## Installation and Usage

### Package Installation

```sh
yarn add sassy-datepicker
# or
npm install sassy-datepicker
```

### Basic Usage

The default export from the library is the `DatePicker` component.

```jsx
import { useState } from 'react';
import DatePicker, { TimePicker } from 'sassy-datepicker';
import 'sassy-datepicker/dist/styles.css';

function DateInput() {
  const [date, setDate] = useState(new Date());

  const onChange = newDate => {
    console.log(`New date selected - ${newDate.toString()}`);
    setDate(newDate);
  };

  return <DatePicker onChange={onChange} value={date} />;
}

function TimeInput() {
  const [time, setTime] = useState({ hours: 15, minutes: 30 });

  const onChange = newTime => {
    console.log(`New time selected - ${newTime}`);
    setTime(newTime);
  };

  return <TimePicker onChange={onChange} value={time} />;
}
```

## Documentation

To view detailed documentation, go to [https://sassy-datepicker.siddharthborderwala.com](https://sassy-datepicker.siddharthborderwala.com)

![Powered By](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)
