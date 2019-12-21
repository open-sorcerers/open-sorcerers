module.exports = {
  scripts: {
    build: {
      default: 'gatsby build',
      storybook: 'cross-env NODE_ENV=production build-storybook -c .storybook -o public/docs'
    },
    clean: 'rimraf ./.cache ./public',
    start: {
      description: 'Run gatsby locally',
      script: 'gatsby develop',
      storybook: 'cross-env NODE_ENV=production start-storybook -p 9000 -c .storybook'
    },
    lint: 'eslint .',
    serve: 'gatsby serve'
  }
}
