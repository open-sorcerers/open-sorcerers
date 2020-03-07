import { Future, isFuture, fork as rawFork, resolve, mapRej } from "fluture"
import { after } from "ramda"
import {
  processHandlebars,
  writeTemplate,
  templatizeActions,
  render
} from "./template"
import { fork } from "./utils"

test("processHandlebars", done => {
  expect(!!processHandlebars).toBeTruthy()
  let sayings = 0
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
  const processF = processHandlebars(boneUI, answers, templateFile, templateF)
  expect(isFuture(processF)).toBeTruthy()
  fork(done, e => {
    expect(e).toEqual("is it yes?")
    done()
  })(processF)
})
test("processHandlebars - error", done => {
  expect(!!processHandlebars).toBeTruthy()
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
  fork(
    e => {
      console.log("JSJSJJSJSJ", e)
      expect(e.message).toEqual("uhhh")
      done()
    },
    xxx => {
      console.log("HHUHUH", xxx)
      done()
    }
  )(processF)
})
test("writeTemplate", () => {
  expect(!!writeTemplate).toBeTruthy()
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
test("render", () => {
  expect(!!render).toBeTruthy()
})
