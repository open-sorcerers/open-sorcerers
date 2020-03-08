import { Future, isFuture, fork as rawFork, resolve, mapRej } from "fluture"

import { after } from "ramda"
import {
  writeOutput,
  processHandlebars,
  writeTemplate,
  templatizeActions,
  render
} from "./template"
import { nameVersion } from "./instance"
import { fork } from "./utils"

test("processHandlebars", done => {
  expect(!!processHandlebars).toBeTruthy()
  let sayings = 0
  const ligament = { cancel: () => {} }
  const boneUI = {
    bar: { updateBottomBar: () => {}, log: { write: () => {} } },
    say: function say(xxx) {
      sayings += 1
      if (sayings === 1) expect(xxx).toEqual("Processing handlebars...")
      if (sayings === 2) expect(xxx).toEqual("Converted templates/madlib.hbs")
      return x => x
    }
  }
  const templateFile = "templates/madlib.hbs"
  const answers = { cool: "yes" }
  const input = `is it {{cool}}?`
  const templateF = resolve(input)
  const processF = processHandlebars(
    ligament,
    boneUI,
    answers,
    templateFile,
    templateF
  )
  expect(isFuture(processF)).toBeTruthy()
  fork(done, e => {
    expect(e).toEqual("is it yes?")
    done()
  })(processF)
})
test("processHandlebars - error", done => {
  const ligament = { cancel: () => {} }
  const boneUI = {
    say: () => x => x
  }
  const templateFile = "templates/madlib.hbs"
  const answers = { cool: "yes" }
  const input = `is it {{undefinedHelper cool}}?`
  const templateF = resolve(input)
  const processF = processHandlebars(
    ligament,
    boneUI,
    answers,
    templateFile,
    templateF
  )
  expect(isFuture(processF)).toBeTruthy()
  fork(e => {
    expect(e.message).toEqual("uhhh")
    done()
  }, done)(processF)
})
test("writeOutput", done => {
  expect(!!writeOutput).toBeTruthy()
  fork(
    done,
    xxx => {
      expect(xxx).toEqual("Generated fakefake")
      done()
    },
    writeOutput("wx", "fakefake", resolve(`cool`))
  )
})

test("writeOutput - error", done => {
  expect(!!writeOutput).toBeTruthy()
  fork(
    xxx => {
      expect(xxx).toEqual(`Unable to write to fail.
\tYou can use the --force flag, but it may overwrite existing files.`)
      done()
    },
    done,
    writeOutput("wx", "fail", resolve(`cool`))
  )
})
test("templatizeActions", () => {
  expect(!!templatizeActions).toBeTruthy()
  const answers = { cool: "yes-very", dope: "so-dope" }
  const actions = [
    {
      templatePath: `{{cool}}-{{dope}}.out`
    }
  ]
  expect(templatizeActions(answers, actions)).toEqual([
    { templatePath: "yes-very-so-dope.out" }
  ])
})
test("templatizeActions - error", () => {
  expect(!!templatizeActions).toBeTruthy()
  const answers = { cool: "yes-very", dope: "so-dope" }
  const actions = [
    {
      templatePath: `{{failure cool}}-{{dope}}.out`
    }
  ]
  expect(() => templatizeActions(answers, actions)).toThrow()
})
test("writeTemplate - error case", done => {
  expect(!!writeTemplate).toBeTruthy()
  const ligament = { cancel: () => {} }
  const boneUI = { say: () => x => x }
  const answers = { cool: "so cool" }
  const flag = "wx"
  const input = ["not add", "failfail", "fail"]
  fork(
    e => {
      expect(e).toEqual("Only add actions are currently supported")
      done()
    },
    done,
    writeTemplate(ligament, boneUI, answers, flag, input)
  )
})
test("render", done => {
  expect(!!render).toBeTruthy()
  const config = {}
  const boneUI = { say: () => x => x }
  const ligament = { cancel: () => {} }
  const answers = { cool: "so cool" }
  const actions = [{ template: "whatever", path: "whatever", type: "add" }]
  const filled = { answers, actions }
  fork(
    done,
    xxx => {
      expect(xxx).toEqual(
        `🦴 ${nameVersion()} - bone-setting complete!\n\t- Generated whatever`
      )
      done()
    },
    render(config, boneUI, ligament, filled)
  )
})

test("render - force", done => {
  expect(!!render).toBeTruthy()
  const config = { force: true }
  const boneUI = { say: () => x => x }
  const ligament = { cancel: () => {}, config: { force: true } }
  const answers = { cool: "so cool" }
  const actions = [{ template: "whatever", path: "whatever", type: "add" }]
  const filled = { answers, actions }
  fork(
    done,
    xxx => {
      expect(xxx).toEqual(
        `🦴 ${nameVersion()} - bone-setting complete!\n\t- Generated whatever`
      )
      done()
    },
    render(config, boneUI, ligament, filled)
  )
})
