import {
  map,
  identity as I,
  chain,
  cond,
  keys,
  prop,
  propEq,
  propOr,
  unless,
  curry
} from "ramda"
import { trace, sideEffect } from "xtrace"
import { mapRej, Future } from "fluture"
import { registerPartial, registerHelper } from "handlebars"
import { cosmiconfig } from "cosmiconfig"
import { ui } from "inquirer"

import { talker } from "./ui"
import { bakeIn } from "./helpers"
import { render } from "./template"
import { saveKeyed } from "./impure"
import { pattern } from "./pattern"
import { pipe, austereStack, deepfreeze } from "./utils"
import { STRINGS } from "./constants"
import { cosmicConfigurate } from "./configure"
import { nameVersion } from "./instance"
import { initialBoneFile } from "./defaults"

const { NO_CONFIG } = STRINGS

const hasNoConfig = propEq(NO_CONFIG, true)

export const getPattern = propOr(false, "pattern")

export const boneDance = curry(({ patterns }, boneUI, ligament, configF) => {
  console.log("WELCOME TO THE BONE ZONE, MANTZOUKAS")
  const config = propOr({}, "config", ligament)
  return chain(
    xxx =>
      console.log("chain gang", xxx) ||
      new Future((bad, good) => {
        cond([
          /* [ */
          /*   ligament.checkCancelled, */
          /*   pipe(boneUI.say("Aborting..."), () => reject("Aborted")) */
          /* ], */
          [
            hasNoConfig,
            pipe(
              boneUI.say("No config found!"),
              () => {
                const ns = propOr("skeletal", "namespace", config)
                return `No config file found for namespace: "${ns}". Try "bone --init ${ns}"?`
              },
              bad
            )
          ],
          [
            () => getPattern(config),
            () => {
              const which = getPattern(config)
              return pipe(
                boneUI.say(`Using "${which}" pattern...\n`),
                prop(which),
                chain(render(config, boneUI, ligament)),
                good
              )(patterns)
            }
          ],
          [
            () => true,
            () =>
              good(
                `🦴 ${nameVersion()} - Available patterns:\n\t- ${keys(
                  patterns
                ).join("\n\t- ")}`
              )
          ]
        ])(xxx)
        return ligament.cancel
      }),
    configF
  )
})

export const skeletal = config => {
  const init = propOr(false, "init", config)
  if (init) return initialBoneFile(config)
  // STATE
  const patterns = {}
  const state = { patterns }
  // UI
  const bar = new ui.BottomBar()
  const talk = talker(config, bar)
  const say = x => sideEffect(() => talk(x + "\n"))
  const boneUI = { bar, talk, say }
  const threads = propOr(10, "threads", config)
  const canceller = propOr(I, "cancel", config)
  // CANCELLATION
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
    canceller()
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
  // inject ligament consuming functions into ligament
  // js: a wild beast of dynamism
  ligament.pattern = saveKeyed(patterns, pattern(ligament))
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(state, boneUI, ligament)),
    trace("configuration!"),
    bakeIn,
    trace("🥓?"),
    boneDance(state, boneUI, ligament),
    trace("👯‍♂️"),
    mapRej(ee => {
      console.warn(`🤕 ${nameVersion()} failed!`)
      return austereStack(ee)
    })
  )(config)
}
