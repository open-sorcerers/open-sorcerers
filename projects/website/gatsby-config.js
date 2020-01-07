module.exports = {
  siteMetadata: {
    name: 'Open Sorcerers',
    basepath: 'https://open.sorcerers.dev',
    description: 'open-source x functional programming x javascript | collective',
    keywords: [
      'open sorcerers',
      'open source',
      'open-source',
      'oss',
      'foss',
      'javascript',
      'js',
      'functional programming',
      'fp',
      'fp js'
    ],
    type: 'website',
    image: 'https://open.sorcerers.dev/logo-open-sorcerers.png'
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          /* {
            resolve: `gatsby-remark-embed-snippet`,
            options: {}
          }, */
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'routes',
        path: `${__dirname}/src/routes/`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          routes: require.resolve('./src/templates/MDXPage/index.js'),
          posts: require.resolve('./src/templates/MDXPage/index.js')
        },
        remarkPlugins: [{ resolve: 'remark-slug' }, { resolve: 'remark-autolink-headings' }],
        gatsbyRemarkPlugins: [
          /* { resolve: 'gatsby-remark-embed-snippet' }, */
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true
            }
          }
        ].concat(
          process.env.OFFLINE
            ? []
            : [
                { resolve: 'gatsby-remark-copy-linked-files' },
                {
                  resolve: 'gatsby-remark-embed-gist'
                }
              ]
        )
      }
    },

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#440099',
        theme_color: '#440099',
        display: 'minimal-ui',
        icon: 'src/assets/logo-open-sorcerers.png' // This path is relative to the root of the site
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/
        }
      }
    },

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@root': '.',

          '@src': 'src',

          '@assets': 'src/assets',
          '@components': 'src/components',
          '@constants': 'src/constants',
          '@domain': 'src/domain',
          '@pages': 'src/pages',
          '@posts': 'src/posts',
          '@queries': 'src/queries',
          '@routes': 'src/routes',
          '@services': 'src/services',
          '@styles': 'src/styles',
          '@templates': 'src/templates',
          '@utils': 'src/utils'
        },
        extensions: ['js', 'mdx']
      }
    }

    // The following are all optional plugins that you may find useful.
    // If you choose not to use them, consider removing them from your package.json!

    // This plugin enables Progressive Web App + Offline functionality
    // https://gatsby.app/offline
    // 'gatsby-plugin-offline',

    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
    //     head: false,
    //     anonymize: false,
    //     respectDNT: false,
    //   },
    // },

    // (optional) Enable the following for Google tag manager
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/
    // {
    //   resolve: 'gatsby-plugin-google-tagmanager',
    //   options: {
    //     id: 'YOUR_GOOGLE_TAGMANAGER_ID',
    //     defaultDataLayer: { platform: "gatsby" },
    //   },
    // },

    // (optional) Enable the following for generation of an XML sitemap
    // https://www.gatsbyjs.org/packages/gatsby-plugin-advanced-sitemap/
    // 'gatsby-plugin-advanced-sitemap',
  ]
}
