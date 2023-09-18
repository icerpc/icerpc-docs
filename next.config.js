module.exports = {
  pageExtensions: ['tsx'],
  output: 'standalone',
  webpack: (config, { defaultLoaders }) => {
    // Ignore the tools directory
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /tools/,
      use: [defaultLoaders.babel]
    });
    return config;
  }
};
