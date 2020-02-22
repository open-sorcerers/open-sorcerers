import fs from "fs"
import chalk from "chalk"
import ghostwrite from "ghostwrite"
import pkg from "../package.json"

const defaultChoosingMessage =
  chalk.blue(`[${pkg.name}]`) + " Please choose a generator."

export const getHelpMessage = generator => {
  const maxLen = Math.max(
    ...generator.prompts.map(prompt => prompt.name.length)
  )
  console.log(
    [
      "",
      chalk.bold("Options:"),
      ...generator.prompts.map(
        prompt =>
          "  --" +
          prompt.name +
          " ".repeat(maxLen - prompt.name.length + 2) +
          chalk.dim(prompt.help ? prompt.help : prompt.message)
      )
    ].join("\n")
  )
}
export const chooseOptionFromList = (skeletalList, message) => {
  const ghost = ghostwrite()
  const generator = ghost.setGenerator("choose", {
    prompts: [
      {
        type: "list",
        name: "generator",
        message: message || defaultChoosingMessage,
        choices: skeletalList.map(({ name, description: dx }) => {
          return {
            name: name + chalk.gray(dx ? " - " + dx : ""),
            value: name
          }
        })
      }
    ]
  })
  return generator.runPrompts().then(results => results.generator)
}

export const displayHelpScreen = () => {
  console.log(
    [
      "",
      chalk.bold("Usage:"),
      `  $ ${pkg.name}                 ` +
        chalk.dim("Select from a list of available generators"),
      `  $ ${pkg.name} <name>          ` +
        chalk.dim("Run a generator registered under that name"),
      `  $ ${pkg.name} <name> [input]  ` +
        chalk.dim("Run the generator with input data to bypass prompts"),
      "",
      chalk.bold("Options:"),
      "  -h, --help             " + chalk.dim("Show this help display"),
      "  -t, --show-type-names  " +
        chalk.dim("Show type names instead of abbreviations"),
      "  -i, --init             " +
        chalk.dim(`Generate a basic ${pkg.name}file.js`),
      "  -v, --version          " + chalk.dim("Print current version"),
      "  -f, --force            " + chalk.dim("Run the generator forcefully"),
      "",
      chalk.dim(" ------------------------------------------------------"),
      chalk.dim("  ⚠  danger waits for those who venture below the line"),
      "",
      chalk.dim(`  --${pkg.name}file     Path to the ${pkg.name}file`),
      chalk.dim(
        `  --cwd          Directory from which relative paths are calculated against while locating the ${pkg.name}file`
      ),
      chalk.dim(
        `  --require      String or array of modules to require before running ${pkg.name}`
      ),
      chalk.dim(
        `  --dest         Output to this directory instead of the ${pkg.name}file's parent directory`
      ),
      ``,
      chalk.bold(`Examples:`),
      `  $ ` + chalk.blue(`${pkg.name}`),
      `  $ ` + chalk.blue(`${pkg.name} component`),
      `  $ ` + chalk.blue(`${pkg.name} component "name of component"`),
      ``
    ].join("\n")
  )
}

export const createInitBonefile = (force = false) => {
  const initString = `module.exports = (${pkg.name}) => {
\t${pkg.name}.setGenerator('basics', {
\t\tdescription: 'this is a skeleton ${pkg.name}file ',
\t\tprompts: [],
\t\tactions: []
\t})
}`

  if (fs.existsSync(process.cwd() + `/${pkg.name}file.js`) && force === false) {
    throw Error(`"${pkg.name}file.js" already exists at this location.`)
  }
  fs.writeFileSync(process.cwd() + `/${pkg.name}file.js`, initString)
}

const typeDisplay = {
  function: chalk.yellow("->"),
  add: chalk.green("++"),
  addMany: chalk.green("+!"),
  modify: `${chalk.green("+")}${chalk.red("-")}`,
  append: chalk.green("_+")
}
export const typeMap = (name, noMap) => {
  const dimType = chalk.dim(name)
  return noMap ? dimType : typeDisplay[name] || dimType
}
