import {
  isCompositeType,
  parseCompositeType,
  isUnionType,
  parseUnionType,
  isArrayType,
  getArrayType,
} from "./types";

const isCompositeTypeCases = [["{ x: Number }", true]];

isCompositeTypeCases.forEach(([type, expected]) => {
  test(`isCompositeType should return ${expected} for ${type}`, () => {
    expect(isCompositeType(type)).toBe(expected);
  });
});

const parseCompositeTypeCases = [
  ["{a:String}", { a: "String" }],
  ["{a:String, b:Number}", { a: "String", b: "Number" }],
  ["{a: { b: Number }}", { a: { b: "Number" } }],
];

parseCompositeTypeCases.forEach(([type, expected]) => {
  test(`parseCompositeType should return ${expected} for ${type}`, () => {
    expect(parseCompositeType(type)).toEqual(expected);
  });
});

const isUnionTypeCases = [
  ["Number|String", true],
  ["String", false],
];

isUnionTypeCases.forEach(([type, expected]) => {
  test(`isUnionType should return ${expected} for ${type}`, () => {
    expect(isUnionType(type)).toBe(expected);
  });
});

const parseUnionTypeCases = [["Number|String", ["Number", "String"]]];

parseUnionTypeCases.forEach(([type, expected]) => {
  test(`parseUnionType should return ${expected} for ${type}`, () => {
    expect(parseUnionType(type)).toEqual(expected);
  });
});

const isArrayTypeCases = [
  ["[Number]", true],
  ["String", false],
  [{}, false]
];

isArrayTypeCases.forEach(([type, expected]) => {
  test(`isArrayType should return ${expected} for ${type}`, () => {
    expect(isArrayType(type)).toBe(expected);
  });
});

const getArrayTypeCases = [
  ["[Number]", "Number"],
  ["[String]", "String"],
];

getArrayTypeCases.forEach(([type, expected]) => {
  test(`getArrayType should return ${expected} for ${type}`, () => {
    expect(getArrayType(type)).toBe(expected);
  });
});
