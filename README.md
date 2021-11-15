<center>
  <h1>sassy-datepicker</h1>
  <p>Beautiful, minimal and accessible date-picker for react.</p>

  <img src="https://user-images.githubusercontent.com/54456279/141679315-1e63bfd3-709e-40b4-9c8f-5b8172429078.jpg" height="200px" />
</center>

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
