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
      script: 'nps smoketest build.modernizr build.gatsby '
    },
    clean: `rimraf ${CLEANABLES.join(' ')}`,
    start: {
      description: 'Run gatsby locally',
      script: 'gatsby develop',
      offline: `cross-env OFFLINE=true gatsby develop`,
      storybook: 'cross-env NODE_ENV=production start-storybook -p 9000 -c .storybook'
    },
    care: {
      description: 'Run all the things and all the tests.',
      script: `nps lint`
    },
    lint: {
      script: multiNPS('lint.eslint', 'lint.stylelint'),
      eslint: 'eslint --fix "src"',
      stylelint: `stylelint "./src/**/*.js"`
    },
    serve: 'gatsby serve',
    friend: `lint-staged`,
    smoketest: `node -p "require('./engraved-raw').engraved"`
  }
}
