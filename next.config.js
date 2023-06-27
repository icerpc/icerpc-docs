// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({ mode: 'static' })({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  }
});
