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
      }
    ],
  },
  extends: ["standard", "prettier"],
  plugins: ["babel", "fp", "import", "prettier", "ramda"]
}
