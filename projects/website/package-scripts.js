const path = require('path')

const npsUtils = require('nps-utils')

const CLEANABLES = ['.cache', 'public'].map(z => path.resolve(process.cwd(), './' + z))
const multiNPS = npsUtils.concurrent.nps

module.exports = {
  scripts: {
    build: {
      description: 'build stuff!',
      gatsby: 'gatsby build',
      modernizr: 'modernizr -c modernizr.config.json -d static',
      storybook: 'cross-env NODE_ENV=production build-storybook -c .storybook -o public/docs',
      script: multiNPS('build.gatsby', 'build.modernizr', 'build.storybook')
    },
    clean: `rimraf ${CLEANABLES.join(' ')}`,
    start: {
      description: 'Run gatsby locally',
      script: 'gatsby develop',
      storybook: 'cross-env NODE_ENV=production start-storybook -p 9000 -c .storybook'
    },
    care: {
      description: 'Run all the things and all the tests.',
      script: `nps lint`
    },
    lint: {
      script: multiNPS('lint.eslint', 'lint.stylelint'),
      eslint: 'eslint ./src --fix',
      stylelint: `stylelint "./src/**/*.js"`
    },
    serve: 'gatsby serve',
    friend: `lint-staged`
  }
}
