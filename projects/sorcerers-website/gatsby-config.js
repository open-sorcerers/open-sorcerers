require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    author: `Brekk Bockrath`,
    basepath: 'https://open.sorcerers.dev',
    description: `open-source x functional-programming x javascript`,
    image: 'https://open.sorcerers.dev/logo.png',
    keywords: ['open-source', 'oss', 'functional programming', 'fp', 'javascript', 'js', 'typescript'],
    name: 'Open Sorcerers',
    siteUrl: `https://open.sorcerers.dev`,
    title: `sorcerers.dev`,
    type: 'website',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@src': 'src',
          '@assets': 'src/assets',
          '@components': 'src/components',
          '@pages': 'src/pages',
          '@templates': 'src/templates',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          pages: require.resolve('./src/templates/Page/index.js'),
        },
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `open.sorcerers.dev`,
        short_name: `sorcerers`,
        start_url: `/`,
        background_color: `#111111`,
        theme_color: `#cc0000`,
        display: `minimal-ui`,
        icon: `src/assets/logo-open-sorcerers.png`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },

    'gatsby-plugin-offline',

    // (optional) Enable the following for generation of an XML sitemap
    // https://www.gatsbyjs.org/packages/gatsby-plugin-advanced-sitemap/
    // 'gatsby-plugin-advanced-sitemap',

    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-remove-console',
    },
  ],
};
