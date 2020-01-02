import fs from "fs"
import F from "fluture"
import kleur from "kleur"
import path from "path"
import {
  length,
  lt,
  ap,
  identity as I,
  forEach,
  ifElse,
  nth,
  filter,
  join,
  uniq,
  values,
  reduce,
  concat,
  difference,
  toPairs,
  prop,
  unless,
  map,
  split,
  pipe,
  curry,
  C
} from "snang/script"

// remove null values
const smooth = filter(I)

const captainPlanet = pipe(
  // split ripgrep input by newlines
  split(C.n),
  // cut apart the [filename, process.env.?] match
  map(z => z && [z.slice(0, z.indexOf(":")), /process\.env\.(\w+)/.exec(z)]),
  smooth,
  // grab only the pertinent info from the resulting regex
  map(([f, e]) => (f && e ? [f, nth(1, e)] : false)),
  smooth,
  // make an object whose keys are files and whose values are arrays of matching ENV vars
  reduce(
    (a, [k, v]) => merge(a, { [k]: a[k] ? uniq(a[k].concat(v).sort()) : [v] }),
    {}
  )
)
// read a file in the Future
const read = x => F.encaseN2(fs.readFile)(x, "utf8")
// write a file in the Future
const write = curry(
  (fd, data) =>
    new F((bad, good) => {
      fs.writeFile(fd, data, "utf8", (e, f) => (e ? bad(e) : good(f)))
    })
)

// an essential tool for using with `ap`
const box = x => [x]
const isArray = Array.isArray

// given per file pollution and all pollution, compare and generate a discrete list
const getPollutionMap = curry((pollutionByFiles, knownPolluters) =>
  map(([file, pp]) => {
    const newPollution = difference(pp, knownPolluters)
    const pollution = difference(pp, newPollution)
    return {
      file,
      newPollution,
      pollution
    }
  }, pollutionByFiles)
)

// coalesce all `env` values from captain-planet.config.json
const getAllKnownPolluters = pipe(values, reduce(concat, []), uniq)

const printErrors = pipe(
  toPairs,
  map(
    ([file, pollution]) =>
      `* ${kleur.red(file)} - ${pollution.map(kleur.yellow).join(", ")}`
  ),
  join(kleur.white("\n"))
)

// flatten errors, combine them, and yell
const lootingAndPollutingIsNotTheWay = pipe(
  reduce(
    ({ mapping, pollution }, [poll, file]) => ({
      mapping: merge(mapping, {
        [file]: (mapping[file] || []).concat(poll)
      }),
      pollution: uniq(pollution.concat(poll))
    }),
    { mapping: {}, pollution: [] }
  ),
  ({ mapping, pollution }) => `
Looters and polluters:

${printErrors(mapping)}

Looting and polluting is not the way.

Consider updating \`captain-planet.config.js\`

${kleur.green(`{
  MY_ENV_NAME: {
    description: 'describe something',
    env: [${pollution.map(z => '"' + z + '"').join(", ")}]
  }
}`)}

Remember to run \`nps lint.env.update\` afterwards.
`
)

const appendFile = file => x => [x, file]

// a bit kludgy but allows us to lookup the mapping from HERE to XXX where
// lookup looks like {XXX: {env: ['HERE']}
const getKeysFromEnvVar = curry((lookup, envVar) =>
  pipe(
    toPairs,
    filter(([, v]) =>
      v && v.env
        ? isArray(v.env)
          ? v.env.includes(envVar)
          : v.env === envVar
        : false
    ),
    reduce((keys, [k]) => keys.concat(k), [])
  )(lookup)
)

const merge = curry((a, b) => Object.assign({}, a, b))

const CAPTAIN_PLANET_CONFIG = "captain-planet.config.json"
const CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART = path.resolve(
  __dirname,
  "..",
  CAPTAIN_PLANET_CONFIG
)

// we're doing work even while failures might exist
const segmentByKnownPolluters = ({ file, newPollution, pollution }) => {
  const isKnown = newPollution.length > 0
  const addFileToStuff = map(appendFile(file))
  return isKnown
    ? [false, addFileToStuff(newPollution)]
    : [true, addFileToStuff(pollution)]
}

// a polluter can be like: {XXX: {env: 'BLAH'}} or {XXX: {env: ['BLAH', 'BLAH2']}}
// singular polluters are the former
const traceSingularPolluter = curry((file, item) => {
  const { files = [] } = item
  return uniq(files.concat(file))
})

// multi polluters are the latter
const traceMultiPolluter = curry((envVar, file, item) => {
  const { files = {} } = item
  return merge(files, {
    [file]: uniq((files[file] || []).concat(envVar))
  })
})

// take pollution and you know, uh, trace it back to its source
// and maybe slap a fine on them
const takePollutionDownToZero = getter => (acc, [envVar, file]) => {
  const clone = merge(acc, {})
  const keys = getter(envVar)
  forEach(k => {
    const item = clone[k]
    const manyToMany = isArray(item.env)
    clone[k].files = !manyToMany
      ? traceSingularPolluter(file, item)
      : traceMultiPolluter(envVar, file, item)
  }, keys)
  return clone
}

// take data and make it [data, [].concat(data.env)]
const structureConfigData = pipe(
  box,
  ap([I, map(pipe(prop("env"), unless(isArray, box)))])
)

// this is definitely not as efficient a lookup as it could be, as we're doing a separate reduce
// inside a reduce
const foldData = curry((raw, actual) => {
  const getter = getKeysFromEnvVar(raw)
  return reduce(
    ([bad, outcome], [valid, mapping]) => {
      if (!valid) {
        return [bad.concat(mapping), outcome]
      }
      const mapped = reduce(takePollutionDownToZero(getter), raw, mapping)
      return [bad, merge(outcome, mapped)]
    },
    [[], {}],
    actual
  )
})

const safeJSONParse = x => {
  try {
    return JSON.parse(x)
  } catch (e) {
    return {}
  }
}

// relate data to itself
const dealWithPollution = data => ([raw, knownPollution]) =>
  pipe(
    getAllKnownPolluters,
    getPollutionMap(toPairs(data)),
    map(segmentByKnownPolluters),
    foldData(raw)
  )(knownPollution)

const fightPollution = data =>
  read(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART)
    .map(safeJSONParse)
    .map(structureConfigData)
    .map(dealWithPollution(data))

const j2 = x => JSON.stringify(x, null, 2)

const getProblems = nth(0)
const getSolutions = nth(1)

const useMagicRings = ifElse(
  // problems?
  pipe(getProblems, length, lt(0)),
  // tell captain planet
  pipe(getProblems, lootingAndPollutingIsNotTheWay, F.reject),
  // update the captain planet config
  pipe(getSolutions, j2, write(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART))
)

module.exports = {
  write,
  read,
  fightPollution,
  useMagicRings,
  captainPlanet,
  CAPTAIN_PLANET_CONFIG
}
