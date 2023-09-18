module.exports = {
  pageExtensions: ['tsx'],
  output: 'standalone',
  webpack: (config, {}) => {
    // Ignore the tools directory
    config.module.rules.push({
      test: /tools/,
      loader: 'ignore-loader'
    });
    return config;
  }
};
