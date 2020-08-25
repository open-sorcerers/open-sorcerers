import { readFile } from "torpor";
import { __, chain, pipe, map } from "ramda";
import { fork } from "fluture";
import { parseWithConfig } from "./parser";
import { PRIMITIVE_TYPES } from "./constants";
import { validate, typeMatch } from "./validate";

test("validate", (done) => {
  pipe(
    readFile(__, "utf8"),
    map(parseWithConfig({})),
    chain(validate),
    fork((errors) => {
      expect(errors).toMatchSnapshot();
      done();
    })(done)
  )("./fixture/validation-cases.js");
});

const typeMatchCases = [
  [{ type: PRIMITIVE_TYPES.Boolean, typeClass: "PRIMITIVE" }, true, true],
  [{ type: PRIMITIVE_TYPES.Boolean, typeClass: "PRIMITIVE" }, false, true],
  [{ type: PRIMITIVE_TYPES.Boolean, typeClass: "PRIMITIVE" }, "false", false],
  [{ type: PRIMITIVE_TYPES.String, typeClass: "PRIMITIVE" }, "string", true],
];

typeMatchCases.forEach(([type, value, expected]) => {
  test(`typeMatch should return "${expected}" for type "${type}" and value "${value}"`, () => {
    expect(typeMatch(type, value)).toBe(expected);
  });
});
