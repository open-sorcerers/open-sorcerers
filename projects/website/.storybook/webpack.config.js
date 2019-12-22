const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const gatsbyConfig = require('../gatsby-config')
const path = require('path')
const { filter, propOr, pathOr, pipe, includes, ifElse, equals, map } = require('ramda')
const localize = z => path.resolve(__dirname, z)
const getAliasedImportsFromGatsby = pipe(
  propOr([], 'plugins'),
  filter(pipe(pathOr(false, ['resolve']), includes('alias'))),
  pathOr({}, [0, 'options', 'alias']),
  map(
    pipe(
      ifElse(
        equals('.'),
        () => '..',
        z => '../' + z
      ),
      localize
    )
  )
)

const pathToInlineSVG = localize('../src/assets')

module.exports = ({ config }) => {
  /* const gPlugins = gatsbyConfig.plugins */
  const aliases = getAliasedImportsFromGatsby(gatsbyConfig)
  config.resolve.alias = aliases
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader')

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env')
  ]

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),

    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries')
  ]

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main']

  config.module.rules.push({
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader'
        // may or may not need this line depending on your app's setup
        // plugins: ['@babel/plugin-transform-react-jsx'],
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})]
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre'
  })

  // svg with @svgr
  const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'))
  fileLoaderRule.exclude = pathToInlineSVG
  config.module.rules.push({
    test: /\.svg$/,
    include: pathToInlineSVG,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true
        }
      }
    ]
  })

  return config
}
