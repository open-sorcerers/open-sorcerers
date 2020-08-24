import { trim, pipe, contains, split } from "ramda";

// @repast isCompositeType :: String -> Boolean
export const isCompositeType = pipe(trim, ([h, ...t]) => h === "{");

// @repast isUnionType :: String -> Boolean
export const isUnionType = pipe(trim, contains("|"));

// @repast parseUnionType :: String -> [String]
export const parseUnionType = pipe(trim, split("|"));
