import { cyan, bold } from "kleur"
import {
  join,
  once,
  when,
  __ as $,
  prop,
  keys,
  cond,
  mergeRight,
  chain,
  ap,
  any,
  equals,
  curry,
  pipe,
  ifElse,
  identity as I,
  unless,
  map,
  reduce,
  propOr,
  pathOr,
  toPairs
} from "ramda"
import { writeFile, readFile } from "torpor"
import { sideEffect, trace } from "xtrace"
import {
  mapRej,
  reject,
  resolve,
  parallel,
  Future,
  fork as rawFork
} from "fluture"
import { j2, box, tacit, futurizeWithCancel } from "ensorcel"
import {
  compile as handleThemBars,
  registerPartial,
  registerHelper
} from "handlebars"
import { cosmiconfig } from "cosmiconfig"
import { prompt, ui } from "inquirer"
import cleanStack from "clean-stack"
import PKG from "../package.json"
import * as bakedIn from "./helpers"
import { austereStack, deepfreeze } from "./utils"

export const fork = tacit(2, rawFork)

export const cosmicConfigurate = curry((boneUI, ligament, cosmic) => {
  const cancel = propOr(I, "cancel", ligament)
  const futurize = futurizeWithCancel(cancel)
  const cosmicLoad = futurize(1, cosmic.load)
  const cosmicSearch = futurize(0, cosmic.search)
  return pipe(
    ifElse(pathOr(false, ["config", "configFile"]), cosmicLoad, () =>
      cosmicSearch()
    ),
    map(
      pipe(
        propOr(I, "config"),
        z => z(ligament),
        sideEffect(when(prop("verbose"), boneUI.say(bold("CONFIG"))))
      )
    )
  )(ligament)
})

const UNSET = `%UNSET%`

const nameVersion = () => bold(PKG.name + PKG.version)

const error = curry((ns, message, data) => {
  const name = `${nameVersion}::${ns}`
  const e = new Error(message)
  e.name = name
  e.data = data
  e.stack = pipe(ST => cleanStack(ST, { pretty: true }), austereStack)(e.stack)
  return e
})

const getName = propOr(UNSET, "name")
const getPrompts = propOr(UNSET, "prompts")
const getActions = propOr(UNSET, "actions")
const ERROR = deepfreeze({
  EXPECTED_NAME_AND_MORE: error(
    `pattern`,
    `Expected pattern to have {name, prompts, actions} properties.`
  ),
  INCOMPLETE_ACTION: error(
    `render`,
    `Expected action to have {type, path, template} properties.`
  )
})

const validatePatternAndSubmit = curry((bad, good, raw) =>
  pipe(
    box,
    ap([getName, getPrompts, getActions]),
    ifElse(
      any(equals(UNSET)),
      pipe(ERROR.EXPECTED_NAME_AND_MORE, bad),
      ([name, prompts, actions]) => ({ name, prompts, actions })
    ),
    good
  )(raw)
)

export const pattern = curry((config, raw) => {
  const cancel = propOr(I, "cancel", config)
  const willPrompt = futurizeWithCancel(cancel, 1, prompt)
  return [
    raw.name,
    pipe(
      chain(futurePattern =>
        pipe(
          propOr([], "prompts"),
          map(willPrompt),
          reduce(
            (left, right) => chain(ll => map(mergeRight(ll), right), left),
            resolve({})
          ),
          map(answers => mergeRight(futurePattern, { answers }))
        )(futurePattern)
      )
    )(
      new Future((bad, good) => {
        validatePatternAndSubmit(bad, good, raw)
        return cancel
      })
    )
  ]
})

const bakeIn = sideEffect(() =>
  pipe(
    toPairs,
    map(([k, v]) => registerHelper(k, v))
  )(bakedIn)
)

const writeTemplate = curry(
  (boneUI, answers, flag, [templateFile, outputFile]) =>
    pipe(
      boneUI.say(`Reading ${templateFile}...`),
      readFile(templateFile),
      map(
        pipe(
          handleThemBars,
          boneUI.say(`Processing handlebars...`),
          fn => fn(answers),
          boneUI.say(`Converted ${templateFile}`)
        )
      ),
      chain(content =>
        pipe(
          writeFile(outputFile, $, { format: "utf8", flag }),
          map(() => `Generated ${outputFile}`),
          mapRej(() => `Unable to write to ${outputFile}`)
        )(content)
      )
    )("utf8")
)

const render = curry((boneUI, config, filled) => {
  const threads = propOr(10, "threads", config)
  const forceWrite = pathOr(false, ["config", "force"], config)
  const { answers, actions } = filled
  const flag = forceWrite ? "w" : "wx"
  return pipe(
    map(
      pipe(
        box,
        ap([propOr(UNSET, "template"), propOr(UNSET, "path")]),
        ifElse(
          any(equals(UNSET)),
          pipe(ERROR.INCOMPLETE_ACTION, reject),
          writeTemplate(boneUI, answers, flag)
        )
      )
    ),
    boneUI.say("Processing..."),
    parallel(threads),
    map(
      pipe(
        join("\n\t- "),
        z => `🦴 ${nameVersion()} - bone-setting complete!\n\t- ` + z
      )
    )
  )(actions)
})

export const pushInto = curry((into, fn) =>
  pipe(
    fn,
    sideEffect(x => into.push(x))
  )
)

export const saveKeyed = curry((struct, fn, input) => {
  const [key, ff] = fn(input)
  struct[key] = ff
  return ff
})

const logOnce = once(console.log)

const talker = curry((conf, bar, text) => {
  if (conf.debug) logOnce(cyan(`DEBUG`), conf)
  if (conf.silent) return
  const up = txt => {
    if (conf.verbose) bar.log.write(txt)
    bar.updateBottomBar(txt)
  }
  if (typeof text === "string") {
    up(text)
  } else if (text.text) {
    up(text.text)
  }
})

export const skeletal = config => {
  // STATE
  const patterns = {}
  // UI
  const bar = new ui.BottomBar()
  const talk = talker(config, bar)
  const say = x => sideEffect(() => talk(x + "\n"))
  const boneUI = { bar, talk, say }
  const threads = propOr(10, "threads", config)
  const which = propOr(false, "pattern", config)
  // CANCELLATION
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
    process.exit(1)
  }
  // closured, for your safety
  const checkCancelled = () => isCancelled
  // wrap our composition steps with this so we can barf early
  const cancellable = unless(checkCancelled)
  // this is what the consumer sees as "bones" in the config file
  const ligament = {
    threads,
    cancel,
    checkCancelled,
    config: deepfreeze(config),
    registerPartial,
    registerHelper
  }
  // inject functions into ligament
  ligament.pattern = saveKeyed(patterns, pattern(ligament))
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(boneUI, ligament)),
    bakeIn,
    chain(
      cond([
        [checkCancelled, pipe(say("Aborting..."), () => reject("Aborted"))],
        [
          () => which,
          () =>
            pipe(
              say(`Using "${which}" pattern...\n`),
              prop(which),

              chain(render(boneUI, ligament))
            )(patterns)
        ],
        [
          () => true,
          () =>
            resolve(
              `🦴 ${nameVersion()} - Available patterns:\n\t- ${keys(
                patterns
              ).join("\n\t- ")}`
            )
        ]
      ])
    ),
    mapRej(ee => {
      if (ee && ee.stack) ee.stack = austereStack(ee.stack)
      console.warn(`🤕 ${nameVersion()} failed!`)
      return ee
    })
  )(config)
}
