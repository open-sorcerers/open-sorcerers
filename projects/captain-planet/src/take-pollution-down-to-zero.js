import {
  ap,
  concat,
  curry,
  difference,
  filter,
  forEach,
  identity as I,
  ifElse,
  join,
  length,
  lt,
  map,
  nth,
  pipe,
  prop,
  reduce,
  toPairs,
  uniq,
  unless,
  values
} from "ramda"
import kleur from "kleur"
import F from "fluture"
import { safeJSONParse, merge, isArray, box, j2 } from "./utils"
import { read, write } from "./fs"
import { CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART } from "./config"

// given per file pollution and all pollution, compare and generate a discrete list
export const getPollutionMap = curry((pollutionByFiles, knownPolluters) =>
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

const appendFile = file => x => [x, file]

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

// relate data to itself
const dealWithPollution = data => ([raw, knownPollution]) =>
  pipe(
    getAllKnownPolluters,
    getPollutionMap(toPairs(data)),
    map(segmentByKnownPolluters),
    foldData(raw)
  )(knownPollution)

export const fightPollution = data =>
  pipe(
    read,
    map(pipe(safeJSONParse, structureConfigData, dealWithPollution(data)))
  )(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART)
const getProblems = nth(0)
const getSolutions = nth(1)

// flatten errors, combine them, and yell
export const lootingAndPollutingIsNotTheWay = pipe(
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

// coalesce all `env` values from captain-planet.config.json
export const getAllKnownPolluters = pipe(values, reduce(concat, []), uniq)

const printErrors = pipe(
  toPairs,
  map(
    ([file, pollution]) =>
      `* ${kleur.red(file)} - ${pollution.map(kleur.yellow).join(", ")}`
  ),
  join(kleur.white("\n"))
)

// a bit kludgy but allows us to lookup the mapping from HERE to XXX where
// lookup looks like {XXX: {env: ['HERE']}
export const getKeysFromEnvVar = curry((lookup, envVar) =>
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

export const useMagicRings = ifElse(
  // problems?
  pipe(getProblems, length, lt(0)),
  // tell captain planet
  pipe(getProblems, lootingAndPollutingIsNotTheWay, F.reject),
  // update the captain planet config
  pipe(getSolutions, j2, write(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART))
)
