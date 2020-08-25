import {
  trim,
  pipe,
  contains,
  replace,
  split,
} from "ramda";

// @repast isCompositeType :: String -> Boolean
export const isCompositeType = pipe(trim, ([h, ...t]) => h === "{");

// @repast parseCompositeType :: String -> Object
export const parseCompositeType = pipe(
  replace(/(\w+)/g, `"$1"`),
  JSON.parse,
);

// @repast isUnionType :: String -> Boolean
export const isUnionType = pipe(trim, contains("|"));

// @repast parseUnionType :: String -> [String]
export const parseUnionType = pipe(trim, split("|"));
