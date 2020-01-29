module.exports = {
  presets: [`@babel/preset-env`],
  plugins: [
    `@babel/plugin-transform-destructuring`,
    `@babel/plugin-proposal-object-rest-spread`,
    [`@babel/plugin-transform-runtime`, { regenerator: true }]
  ]
}