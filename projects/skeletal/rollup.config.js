import resolve from "@rollup/plugin-node-resolve"
import cjs from "@rollup/plugin-commonjs"
import cli from "rollup-plugin-cli"
import buble from "@rollup/plugin-buble"
import json from "@rollup/plugin-json"
import progress from "rollup-plugin-progress"
import pkg from "./package.json"

const external = ["fs", "path"].concat(
  pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
)
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
    output: [
      { file: pkg.main, format: `cjs` },
      { file: pkg.module, format: "esm" }
    ],
    plugins
  },
  {
    input: `src/skeletal-cli.js`,
    external,
    output: [{ file: `bone-cli.js`, format: `cjs` }],
    plugins: plugins
      .slice(0, 2)
      .concat([cli()])
      .concat(plugins.slice(2, Infinity))
  }
]
