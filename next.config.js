const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  productionBrowserSourceMaps: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  trailingSlash: true
});
