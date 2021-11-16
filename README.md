# sassy-datepicker

[![npm version](https://badge.fury.io/js/sassy-datepicker.svg)](https://badge.fury.io/js/sassy-datepicker)
[![CI Status](https://github.com/sassy-labs/datepicker/actions/workflows/main.yml/badge.svg)](https://github.com/sassy-labs/datepicker/actions/workflows/test.yml)
[![Maintenance Status](https://badgen.net/badge/maintenance/active/green)](https://github.com/teafuljs/teaful#maintenance-status)
[![GitHub Discussions: Chat With Us](https://badgen.net/badge/discussions/chat%20with%20us/purple)](https://github.com/sassy-labs/datepicker/discussions)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg)

Beautiful, minimal, customizable and accessible date-picker for react.

<img src="https://user-images.githubusercontent.com/54456279/141679315-1e63bfd3-709e-40b4-9c8f-5b8172429078.jpg" height="200px" />

## Installation

```sh
yarn add sassy-datepicker
# or
npm install sassy-datepicker
```

## Usage

```jsx
import { useState } from 'react';
import DatePicker from 'sassy-datepicker';

function Example() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    console.log(`New date selected - ${newDate.toString()}`);
    setDate(newDate);
  };

  return (
    <DatePicker onChange={onChange} initialDate={date} />
  );
}
```

Suppose you only want to allow dates within a certain range, for that you can use the `maxDate` and `minDate` props.

```jsx
function InRange() {
  // minDate = today
  // maxDate = 1st January 2022

  return (
    <DatePicker minDate={new Date()} maxDate={new Date(2022, 0, 1)} />
  );
}
```

> **Note**: Make sure when using both `initialDate` and `min/maxDate` props, the `initialDate` is in the range you specify using `min/maxDate` prop.

## Customization

Styles have been defined using CSS custom properties under the `sdp` CSS class, hence those properties will have to be changed for customization.

Note - You will have to use the `!important` directive to override the default styles

- Background Color for Selected Date (default #60a5fa)

```css
.sdp {
  --theme-color: #8b5cf6 !important; /* violet color */
}
```

- Text Color for Selected Date (default #ffffff)

```css
.sdp {
  --selected-date-color: #eeeeee !important; /* light-gray color */
}
```

- Font Family (default 'Inter')

```css
.sdp {
  --font: 'Kollektif', sans-serif !important;
}
```
