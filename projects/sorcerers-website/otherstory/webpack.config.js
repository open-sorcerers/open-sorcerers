const path = require('path');
const { map } = require('ramda');
const local = path.resolve(__dirname, '../src/assets');
const gatsbyConfig = require('../gatsby-config');
console.log(gatsbyConfig, 'CONFIG');
module.exports = ({ config }) => {
  config.resolve.alias = Object.assign(
    {},
    config.resolve.alias,
    map(x => path.resolve(process.cwd(), x), gatsbyConfig.plugins[2].options.alias),
  );
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('@emotion/babel-preset-css-prop'),
  ];

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve('@babel/plugin-proposal-class-properties'),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve('babel-plugin-remove-graphql-queries'),
  ];

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main'];

  // svg with @svgr
  const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
  fileLoaderRule.exclude = local;
  config.module.rules.push({
    test: /\.svg$/,
    include: local,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          // icon: true,
          icon: false,
        },
      },
    ],
  });
  console.log(config, 'CONFIG');
  return config;
};
