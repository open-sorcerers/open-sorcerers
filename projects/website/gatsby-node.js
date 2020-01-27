const path = require('path')
const {
  T,
  always: K,
  ap,
  curry,
  ifElse,
  includes,
  map,
  pathOr,
  pipe,
  prop,
  propOr,
  toPairs,
  cond
} = require('ramda')

const box = x => [x]

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
// eslint-disable-next-line space-before-function-paren
exports.createPages = async ({ actions, graphql }) => {
  const posts = await graphql(`
    query allPosts {
      allMdx {
        nodes {
          id
          frontmatter {
            menu
            title
            author
            path
            keywords
            menu
            private
            draft
            excerpt
            publishAfter
            dateEdited
            datePublished
          }
          fileAbsolutePath
          excerpt(pruneLength: 420)
        }
      }
    }
  `)

  const getName = ifElse(
    pathOr(false, ['frontmatter', 'path']),
    pathOr(false, ['frontmatter', 'path']),
    pipe(
      prop('fileAbsolutePath'),
      z => z.slice(z.lastIndexOf('/') + 1),
      z => z.slice(0, z.indexOf('.'))
    )
  )
  return posts.data.allMdx.nodes.forEach(post => {
    const isProd = process.env.NODE_ENV !== 'development'
    const fm = propOr({}, 'frontmatter', post)
    const [title, priv, draft, after, postPath] = pipe(
      box,
      ap([
        propOr('???', 'title'),
        propOr(false, 'private'),
        propOr(false, 'draft'),
        propOr(new Date(Date.now() - 1e5), 'publishAfter'),
        propOr('/writing/' + getName(post), 'path')
      ])
    )(fm)
    /* eslint-disable no-console */
    if (isProd) {
      // hide private
      if (priv) {
        console.warn(`Found private. Skipping "${title}"...`)
        return
      }
      // hide if draft
      if (draft) {
        console.warn(`Found draft. Skipping "${title}"...`)
        return
      }
      if (after) {
        const parsed = Date.parse(after)
        if (isNaN(parsed)) {
          console.error(
            `Unable to parse frontmatter.publishAfter (got: ${after}), skipping "${title}"...`
          )

          throw new Error(`Unable to parse frontmatter.publishAfter for ${title}`)
        }
        const THRESHOLD = 1000 * 60 * 20
        if (Date.now() + THRESHOLD < parsed) {
          console.warn(`Not yet ready to publish: Skipping "${title}"...`)
          return
        }
      }
    }
    /* eslint-enable no-console */
    const PAGES = map(K, {
      series: path.resolve('./src/templates/SeriesPage/index.js'),
      verb: path.resolve('./src/templates/VerbPage/index.js'),
      default: path.resolve('./src/templates/MDXPage/index.js')
    })
    const component = cond([
      [includes('series-fp'), PAGES.series],
      [includes('routes/glossary'), PAGES.default],
      [includes('routes'), PAGES.verb],
      [T, PAGES.default]
    ])(post.fileAbsolutePath)
    actions.createPage({
      path: postPath,
      frontmatter: fm,

      component,
      context: post
    })
  })
}

const clientOnlyMatches = {
  settings: /^\/settings/,
  // settings/login
  // settings/logout
  // settings/profile
  build: /^\/build/
  // build/example
}

const setClientOnlyRoute = curry((createPage, page, [key, match]) => {
  if (page.path.match(match)) {
    page.matchPath = `/${key}/*`
    createPage(page)
  }
})

// eslint-disable-next-line space-before-function-paren
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  const clientize = setClientOnlyRoute(createPage, page)

  return pipe(toPairs, map(clientize))(clientOnlyMatches)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      title: String
      author: String
      path: String
      keywords: [String]
      menu: String
      glossary: [String]
      excerpt: String
      tags: [String]
      private: Boolean
      draft: Boolean
      publishAfter: Date @dateformat(formatString: "YYYY-MM-DD")
      dateEdited: Date @dateformat(formatString: "YYYY-MM-DD")
      datePublished: Date @dateformat(formatString: "YYYY-MM-DD")
    }
  `
  createTypes(typeDefs)
}
/*
const logOnce = once(console.log)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Mdx') {
    logOnce('hey node', node)
  }
}
*/
