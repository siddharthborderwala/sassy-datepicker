<center>
  <h1>sassy-datepicker</h1>
  <p>Beautiful, minimal and accessible date-picker for react.</p>

  <img src="https://user-images.githubusercontent.com/54456279/141672075-4e289fd5-4234-465b-8596-d9f016be9f9d.jpg" height="200px" />
</center>

## Installation

```sh
yarn add sassy-datepicker
# or
npm install sassy-datepicker
```

## Usage

```jsx
import DatePicker from 'sassy-datepicker';

function Example() {
  const onChange = (date) => {
    console.log(date.toString());
  };

  return (
    <DatePicker onChange={onChange} />
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