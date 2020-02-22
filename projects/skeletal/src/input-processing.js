import chalk from "chalk"
import { map, pipe, prop, curry, findIndex, equals } from "ramda"
import minimist from "minimist"
import pkg from "../package.json"
import { createInitBonefile, displayHelpScreen } from "./console-out"

const lookupIndex = curry((eoaArg, free) =>
  pipe(findIndex(equals(eoaArg)), i => (i === -1 ? i : free.length))(free)
)

const getGeneratorArgs = args => {
  const eoaIndex = args.indexOf("--")
  return eoaIndex === -1
    ? { skeletalArgV: [] }
    : {
        skeletalArgV: minimist(args.slice(eoaIndex + 1, args.length)),
        eoaArg: args[eoaIndex + 1]
      }
}

export const getBypassAndGenerator = skeletal => {
  const args = process.argv.slice(2)
  const argv = minimist(args)
  const { skeletalArgV, eoaArg } = getGeneratorArgs(args)

  let name = ""
  let bypassArr = []
  const names = map(prop("name"))(skeletal.getGeneratorList())
  const free = argv._

  for (let i = 0; i < free.length; i++) {
    const nameTest = (name.length ? name + " " : "") + free[i]
    if (listHasOptionThatStartsWith(names, nameTest)) {
      name = nameTest
    } else {
      const index = lookupIndex(eoaArg, free)
      bypassArr = free
        .slice(i, index)
        .map(arg => (/^_+$/.test(arg) ? undefined : arg))
      break
    }
  }

  return { generatorName: name, bypassArr, skeletalArgV }
}

const listHasOptionThatStartsWith = (list, prefix) =>
  list.some(txt => txt.indexOf(prefix) === 0)

const maybe = {
  printHelp: ({ help, h }) => {
    if (help || h) {
      displayHelpScreen()
      process.exit(0)
    }
  },
  initialize: ({ init, i, force: _force = false, f = false }) => {
    if (init || i) {
      const force = _force || f
      try {
        createInitBonefile(force)
        process.exit(0)
      } catch (err) {
        console.error(chalk.red(`[${pkg.name}] `) + err.message)
        process.exit(1)
      }
    }
  },
  version: curry((env, { version, v }) => {
    if (version || v) {
      const localVersion = env.modulePackage.version
      if (localVersion !== pkg.version && localVersion != null) {
        console.log(chalk.yellow("CLI version"), pkg.version)
        console.log(chalk.yellow("Local version"), localVersion)
      } else {
        console.log(pkg.version)
      }
      process.exit(0)
    }
  })
}

export const handleArgFlagsFromArgs = curry((args, env) => {
  const argv = minimist(args)
  if (argv._.length === 0) {
    maybe.printHelp(argv)
    maybe.initialize(argv)
    maybe.version(env, argv)
  }
  if (!env.configPath) {
    console.error(chalk.red(`[${pkg.name}] `) + `No ${pkg.name}file found`)
    displayHelpScreen()
    process.exit(1)
  }
})

export const handleArgFlags = handleArgFlagsFromArgs(process.argv.slice(2))
