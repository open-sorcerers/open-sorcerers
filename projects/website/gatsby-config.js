const R = require('ramda')

const { map, curry, pipe, reduce, merge } = R

const gatsbyRemarkPlugins = (process.env.OFFLINE
  ? []
  : [
      { resolve: 'gatsby-remark-copy-linked-files' },
      {
        resolve: 'gatsby-remark-embed-gist'
      }
    ]
).concat({
  resolve: 'gatsby-remark-prismjs',
  options: {
    showLineNumbers: true
  }
})

const srcFs = xx =>
  Array.isArray(xx) && xx[1]
    ? {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: xx[0],
          path: `${__dirname}/src/${xx[1]}/`
        }
      }
    : {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: xx,
          path: `${__dirname}/src/${xx}/`
        }
      }

const KEYED_PATHS = [
  ['glossary', 'content/glossary'],
  ['modules', 'content/modules'],
  'pages',
  'posts',
  'routes',
  ['reviews', 'content/reviews']
]

const namedFilePaths = map(srcFs, KEYED_PATHS)

const layout = curry((pt, kk) =>
  Array.isArray(kk) ? { [kk[0]]: require.resolve(pt) } : { [kk]: require.resolve(pt) }
)
const allLayoutsAreTheSame = layout('./src/templates/MDXPage/index.js')
const defaultLayouts = pipe(map(allLayoutsAreTheSame), reduce(merge, {}))(KEYED_PATHS)

const plugins = (process.env.OFFLINE
  ? []
  : [
      {
        resolve: 'gatsby-source-meetup-events',
        options: {
          groupId: `open-sorcerers`
        }
      },
      {
        resolve: `gatsby-source-github-contributors`,
        options: {
          repo: 'open-sorcerers/open-sorcerers'
        }
      }
    ]
).concat([
  {
    resolve: `gatsby-plugin-build-date`,
    options: {
      formatting: {
        format: 'DD-MM-YYYY',
        utc: true
      }
    }
  },
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
  ...namedFilePaths,
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.mdx', '.md'],
      defaultLayouts,
      remarkPlugins: [{ resolve: 'remark-slug' }, { resolve: 'remark-autolink-headings' }],
      gatsbyRemarkPlugins
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
        '@utils': 'src/utils',

        '@content': 'src/content',
        '@glossary': 'src/content/glossary',
        '@modules': 'src/content/modules',
        '@reviews': 'src/content/reviews'
      },
      extensions: ['js', 'mdx']
    }
  }
])

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
  plugins
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
}
