import {
  trim,
  pipe,
  contains,
  map,
  reduce,
  split,
  drop,
  dropLast,
  assoc,
} from "ramda";

// @repast isCompositeType :: String -> Boolean
export const isCompositeType = pipe(trim, ([h, ...t]) => h === "{");

// @repast parseCompositeType :: String -> Object
export const parseCompositeType = pipe(
  trim,
  drop(1),
  dropLast(1),
  split(","),
  reduce(
    (r, pair) => pipe(split(":"), map(trim), ([k, v]) => assoc(k, v, r))(pair),
    {}
  )
);

// @repast isUnionType :: String -> Boolean
export const isUnionType = pipe(trim, contains("|"));

// @repast parseUnionType :: String -> [String]
export const parseUnionType = pipe(trim, split("|"));
