module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": [2, { semi: false }],
    "no-extra-semi": 2,
    "no-var": 2,
    eqeqeq: [2, "smart"],
    "arrow-parens": [2, "as-needed"],
    "consistent-this": 0,
    "func-names": [2],
    "max-len": [1, 100, 2],
    "new-cap": [2, { capIsNew: false }],
    "no-trailing-spaces": [2, { skipBlankLines: true }],
    "no-unused-vars": [2, { vars: "all", varsIgnorePattern: "^___" }],
    "no-shadow": [2, { builtinGlobals: false, hoist: "all" }],
    "import/named": 2,
    "import/no-mutable-exports": 2,
    "import/order": 2,
    "import/extensions": [
      2,
      {
        json: "always",
        js: "never",
        validation: "always",
        task: "always"
      }
    ],
    "jsdoc/check-alignment": 1,
    "jsdoc/check-examples": 1,
    "jsdoc/check-indentation": 1,
    "jsdoc/check-param-names": 1,
    "jsdoc/check-syntax": 1,
    "jsdoc/check-tag-names": 1,
    "jsdoc/implements-on-classes": 1,
    "jsdoc/match-description": 1,
    "jsdoc/newline-after-description": 1,
    "jsdoc/no-undefined-types": 1,
    "jsdoc/require-description": 1,
    "jsdoc/require-example": 1,
    "jsdoc/require-hyphen-before-param-description": 1,
    "jsdoc/require-jsdoc": 1,
    "jsdoc/require-param": 1,
    "jsdoc/require-param-description": 1,
    "jsdoc/require-param-name": 1,
    "jsdoc/require-param-type": 1,
    "jsdoc/require-returns": 1,
    "jsdoc/require-returns-check": 1,
    "jsdoc/require-returns-description": 1,
    "jsdoc/require-returns-type": 1,
    "jsdoc/valid-types": 1,
    "fp/no-mutating-assign": "error",
    "fp/no-delete": "error"
  },
  extends: ["standard", "prettier"],
  plugins: ["babel", "fp", "import", "prettier", "jsdoc", "ramda"]
}
