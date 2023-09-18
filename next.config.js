const rulesToProcess = [/\.m?js/, /\.(js|cjs|mjs)$/].map(String);

module.exports = {
  pageExtensions: ['tsx'],
  output: 'standalone',
  webpack: (config, {}) => {
    // Ignore the tools directory
    config.module.rules = config.module.rules.map((rule) => {
      if (rule !== '...' && rulesToProcess.indexOf(String(rule.test)) > -1) {
        rule.exclude = ['/tools/'];
      }
      return rule;
    });
    return config;
  }
};
