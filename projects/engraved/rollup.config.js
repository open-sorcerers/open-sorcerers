import resolve from "@rollup/plugin-node-resolve"
import cjs from "@rollup/plugin-commonjs"
import buble from "@rollup/plugin-buble"
import json from "@rollup/plugin-json"
import progress from "rollup-plugin-progress"
/* import sizes from "rollup-plugin-sizes" */
import pkg from "./package.json"

const external = pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
const plugins = [
  progress(),
  json(),
  cjs({
    extensions: [`.js`, `.json`],
    include: `node_modules/**`
  }),
  resolve({
    preferBuiltins: true
  }),
  buble({
    transforms: { forOf: false },
    objectAssign: true
  })
  /* sizes({ details: true }) */
]

export default [
  {
    input: `src/index.js`,
    external,
    output: [{ file: pkg.main, format: `cjs` }],
    plugins
  }
]
