# sassy-datepicker

[![npm version](https://badge.fury.io/js/sassy-datepicker.svg)](https://badge.fury.io/js/sassy-datepicker)
[![CI Status](https://github.com/sassy-labs/datepicker/actions/workflows/main.yml/badge.svg)](https://github.com/sassy-labs/datepicker/actions/workflows/main.yml)
[![Bundle Size: Minified + Gzipped](https://img.shields.io/bundlephobia/minzip/sassy-datepicker?color=orange&label=minzip)](https://bundlephobia.com/package/sassy-datepicker)
[![Maintenance Status](https://badgen.net/badge/maintenance/active/green)](https://github.com/sassy-labs/datepicker#maintenance-status)
[![GitHub Issues: Chat With Us](https://badgen.net/badge/issues/chat%20with%20us/purple)](https://github.com/sassy-labs/datepicker/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blueviolet.svg)](https://github.com/sassy-labs/datepicker/pulls)

Beautiful, minimal, customizable and accessible date-picker for react.

<img src="https://user-images.githubusercontent.com/54456279/141679315-1e63bfd3-709e-40b4-9c8f-5b8172429078.jpg" height="200px" />

Why use sassy-datepicker?

- Beautiful picker
- Simple and Easy to Use
- Customizable
- First Class Accessibility
- Small bundle size

## Contents

- [sassy-datepicker](#sassy-datepicker)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Customization](#customization)
  - [Props](#props)
  - [Example](#example)

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

  const onChange = newDate => {
    console.log(`New date selected - ${newDate.toString()}`);
    setDate(newDate);
  };

  return <DatePicker onChange={onChange} selected={date} />;
}
```

Suppose you only want to allow dates within a certain range, for that you can use the `maxDate` and `minDate` props.

```jsx
function InRange() {
  // suppose you want to allow user to pick a date from today to the end of this year
  // minDate = today
  // maxDate = 31st December 2021

  return <DatePicker minDate={new Date()} maxDate={new Date(2021, 11, 31)} />;
}
```

> **Note**: Make sure when using both `selected` and `min/maxDate` props, the `selected` is in the range you specify using `min/maxDate` prop.

## Customization

Styles have been defined using CSS custom properties under the `sdp` CSS class, hence those properties will have to be changed for customization.

Note - You will have to use the `!important` directive to override the default styles

- Background Color for Selected Date (default `#60a5fa`)

```css
.sdp {
  --theme-color: #8b5cf6 !important; /* violet color */
}
```

- Text Color for Selected Date (default `#ffffff`)

```css
.sdp {
  --selected-date-color: #eeeeee !important; /* light-gray color */
}
```

- Font Family (default `inherit` i.e. inherits from the parent element)

```css
.sdp {
  --font: 'Kollektif', sans-serif !important;
}
```

## Props

| Name         |          Type           | Description                                                                   |
| :----------- | :---------------------: | :---------------------------------------------------------------------------- |
| onChange     | `(date: Date) => void;` | This function is triggered every time the selected date in the picker changes |
| selected     |         `Date`          | The selected date                                                       |
| minDate      |         `Date`          | The lowest date value allowed                                                 |
| maxDate      |         `Date`          | The highest date value allowed                                                |
| className    |        `string`         | The className prop                                                            |
| ref          |   `React.ForwardRef`    | The ref prop                                                                  |

## Example

You can view a good example over at [Stackblitz](https://stackblitz.com/edit/react-umsdtl)
