import resolve from "@rollup/plugin-node-resolve"
import cjs from "@rollup/plugin-commonjs"
import cli from "rollup-plugin-cli"
import buble from "@rollup/plugin-buble"
import json from "@rollup/plugin-json"
import progress from "rollup-plugin-progress"
/* import sizes from "rollup-plugin-sizes" */
import pkg from "./package.json"

const external = ["path"].concat(
  pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
)
const plugins = [
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
    input: `src/cli.js`,
    external: external.concat(["fs"]),
    output: [{ file: `repast.js`, format: `cjs` }],
    plugins: plugins
      .slice(0, 2)
      .concat([cli()])
      .concat(plugins.slice(2, Infinity))
  }
]
