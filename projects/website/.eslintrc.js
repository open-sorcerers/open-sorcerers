module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
  plugins: ['import', 'react', 'ramda', 'jsdoc', 'prefer-object-spread', 'compat', 'jsx-a11y'],
  globals: {
    graphql: false
  },
  rules: {
    // Prettier warnings
    'prettier/prettier': 'warn',

    'no-unused-expressions': 2,

    // Suggested import order for packages
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],

    // Turn of preference of default export
    'import/prefer-default-export': 'off',

    // JSX allowed in .js files
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // Allow props spreading on components
    'react/jsx-props-no-spreading': 'off',

    // Disable the formatting of JSX elements (it doesn't always know whats best!)
    'react/jsx-one-expression-per-line': 'off',

    // Turn off an annoying rule when using Gatsby's Link component
    'jsx-a11y/anchor-is-valid': 'off',

    // Turn off wrapping every emoji in <span> tags
    'jsx-a11y/accessible-emoji': 2,

    'no-extra-semi': 2,
    'no-undef': 2,
    'no-var': 2,
    eqeqeq: [2, 'smart'],
    'arrow-parens': [2, 'as-needed'],
    'consistent-this': 0,
    'func-names': [2],
    'max-len': [1, 100, 2],
    'new-cap': [2, { capIsNew: false }],
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'no-unused-vars': [2, { vars: 'all', varsIgnorePattern: '^___' }],
    'space-before-function-paren': [2, 'never'],
    'no-shadow': [2, { builtinGlobals: false, hoist: 'all' }],
    'import/named': 2,
    'import/no-mutable-exports': 2,
    'import/order': 2,
    'import/extensions': [
      2,
      {
        json: 'always',
        js: 'never',
        validation: 'always',
        task: 'always',
        svg: 'always'
      }
    ],
    'jsdoc/check-alignment': 1,
    'jsdoc/check-examples': 1,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/implements-on-classes': 1,
    'jsdoc/match-description': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/no-undefined-types': 1,
    'jsdoc/require-description': 1,
    'jsdoc/require-example': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-jsdoc': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns': 1,
    'jsdoc/require-returns-check': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1,
    'jsdoc/valid-types': 1
  },
  overrides: [
    {
      files: ['**/*.stories.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
}
