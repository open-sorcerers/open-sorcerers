import { propOr, pipe, chain, map } from "ramda"
import { writeFile } from "torpor"
import { mapRej } from "fluture"
import { nameVersion, nameAndVersion } from "./instance"

export const INITIAL_BONEFILE = `// 🦴 ${nameAndVersion()} autogenerated bonefile 

module.exports = bones => {
  console.log("runtime bones.config", bones.config)
  bones.pattern({
    name: "madlib",
    prompts: [
      { type: "input", name: "name", message: "A name?" },
      { type: "input", name: "adjective1", message: "An adjective?" },
      { type: "input", name: "noun1", message: "A noun?" },
      { type: "input", name: "verb1", message: "A verb?" },
      { type: "input", name: "verb2", message: "Another verb?" },
      { type: "input", name: "group", message: "A group noun?" },
      { type: "input", name: "verb3", message: "Yet another verb?" },
    ],
    actions: [
      {
        type: "add",
        template: "templates/example-madlib.hbs",
        path: "{{paramCase adjective1}}-{{paramCase noun1}}.md"
      }
   ]
  })
}

`

export const UTF8_NO_OVERWRITE = { format: "utf8", flag: "wx" }

// Skeletal is a very cool library. If you use it and like it, please tell others about it.
export const MADLIB = `// a 🦴 ${nameAndVersion()} madlib

{{name}} is a very {{adjective1}} {{noun1}}.
If you {{verb1}} it and {{verb2}} it,
please {{verb3}} {{#if group}}{{group}}{{else}}others{{/if}} about it. 

`

export const initialBoneFile = config => {
  const ns = propOr("skeletal", "init", config)
  const templatePath = propOr(
    "templates/example-madlib.hbs",
    "templatePath",
    config
  )
  const outPath = propOr(`${ns}.config.js`, "outPath", config)
  return pipe(
    writeFile(templatePath, MADLIB),
    chain(() => writeFile(outPath, INITIAL_BONEFILE, UTF8_NO_OVERWRITE)),
    mapRej(() => `Unable to write file to ${outPath}, it may already exist?`),
    map(
      () =>
        `🦴 ${nameVersion()} - Wrote initial config file to ${ns}.config.js!
\tRun 'bone ${ns !== "skeletal" ? "-n " + ns + " " : ""}-p madlib' :)`
    )
  )({ format: "utf8", flag: "w" })
}
