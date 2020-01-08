const path = require('path')
const { ap, curry, toPairs, map, pathOr, ifElse, prop, pipe, propOr } = require('ramda')

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
            title
            author
            path
            keywords
            private
            draft
            publishAfter
          }
          fileAbsolutePath
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
    const isProd = process.env.NODE_ENV === 'production'
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

    actions.createPage({
      path: postPath,
      frontmatter: fm,
      component: path.resolve('./src/templates/MDXPage/index.js'),
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
      glossary: [String]
      tags: [String]
      private: Boolean
      draft: Boolean
      publishAfter: Date @dateformat(formatString: "DD-MM-YYYY")
    }
  `
  createTypes(typeDefs)
}
