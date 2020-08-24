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
  [PRIMITIVE_TYPES.Boolean, true, true],
  [PRIMITIVE_TYPES.Boolean, false, true],
  [PRIMITIVE_TYPES.Boolean, "false", false],
  [PRIMITIVE_TYPES.String, "string", true],
];

typeMatchCases.forEach(([type, value, expected]) => {
  test(`typeMatch should return "${expected}" for type "${type}" and value "${value}"`, () => {
    expect(typeMatch(type, value)).toBe(expected);
  });
});
