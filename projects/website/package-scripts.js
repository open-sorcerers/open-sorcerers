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
    lint: {
      script: `nps lint.eslint lint.stylelint`,
      eslint: 'eslint . --fix',
      stylelint: `stylelint "./src/**/*.js"`
    },

    serve: 'gatsby serve',
    friend: `lint-staged`
  }
}
