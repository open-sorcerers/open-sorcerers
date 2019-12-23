const path = require('path')
const { curry, toPairs, map, pathOr, ifElse, prop, pipe } = require('ramda')
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
            author
            path
            title
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
  console.log('posts', posts.data)
  return posts.data.allMdx.nodes.forEach(
    post =>
      console.log(post, '<POST>') ||
      actions.createPage({
        path: '/writing/' + getName(post),
        frontmatter: post.frontmatter,
        component: path.resolve('./src/templates/MDXPage/index.js'),
        context: post
      })
  )
}

const clientOnlyMatches = {
  settings: /^\/settings/,
  contribute: /^\/contribute/,
  learn: /^\/learn/
}

const setClientOnlyRoute = curry((createPage, page, [key, match]) => {
  if (page.path.match(match)) {
    page.matchPath = `/${key}/*`
    console.log('making client-only page', page)
    createPage(page)
  }
})

// eslint-disable-next-line space-before-function-paren
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  const clientize = setClientOnlyRoute(createPage, page)
  return pipe(toPairs, map(clientize))(clientOnlyMatches)
}
