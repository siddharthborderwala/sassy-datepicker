import footer from 'components/footer';
import editLink from 'components/edit-link';

export default {
  project: {
    link: 'https://github.com/sassy-labs/datepicker',
  },
  docsRepositoryBase: 'https://github.com/sassy-labs/datepicker',
  titleSuffix: ' - Sassy DatePicker',
  navigation: {
    next: true,
    prev: true,
  },
  unstable_flexsearch: true,
  footer: {
    component: footer,
  },
  editLink: {
    component: editLink,
    text: 'Edit this page on GitHub',
  },
  logo: (
    <h1>
      <strong>sassy-datepicker</strong>
    </h1>
  ),
  faviconGlyph: '🗓',
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
