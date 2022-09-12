export default {
  project: {
    link: 'https://github.com/sassy-labs/datepicker',
  },
  titleSuffix: ' - Sassy DatePicker',
  navigation: {
    next: true,
    prev: true,
  },
  unstable_flexsearch: true,
  darkMode: true,
  footer: true,
  footer: {
    text: `MIT ${new Date().getFullYear()} © Siddharth Borderwala.`,
  },
  editLink: {
    text: `Edit this page on GitHub`,
  },
  logo: <strong>sassy-datepicker</strong>,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Sassy DatePicker: Beautiful, Minimal, Accessible and Fully Customizable Date Picker and Time Picker for React.js"
      />
      <meta name="og:title" content="Sassy DatePicker" />
    </>
  ),
};
