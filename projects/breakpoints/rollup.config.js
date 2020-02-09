import resolve from "@rollup/plugin-node-resolve"
import cjs from "@rollup/plugin-commonjs"
import babel from "rollup-plugin-babel"
import json from "@rollup/plugin-json"
import progress from "rollup-plugin-progress"
/* import sizes from "rollup-plugin-sizes" */
import pkg from "./package.json"

const external = ["path"].concat(
  pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
)
const plugins = [
  progress(),
  json(),

  resolve({
    preferBuiltins: true
  }),
  babel({
    exclude: "node_modules/**",
    presets: ["react-app"],
    plugins: [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      "transform-react-remove-prop-types"
    ],
    runtimeHelpers: true
  })
  /* sizes({ details: true }) */
]

export default [
  {
    input: `src/index.js`,
    external,
    output: [
      /* { file: pkg.main, format: `cjs` }, */
      { file: pkg.module, format: "esm" }
    ],
    plugins
  }
]
