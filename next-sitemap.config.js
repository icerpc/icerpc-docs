/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://docs.icerpc.dev',
  generateRobotsTxt: true,
  // The Markdown copies and their index name the HTML pages as canonical.
  exclude: ['/md/*', '/llms.txt']
};

export default config;
