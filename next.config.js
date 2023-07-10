module.exports = {
  pageExtensions: ['tsx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/getting-started',
        permanent: true,
      },
    ]
  },
}