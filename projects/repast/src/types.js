import { trim, pipe, contains, equals, replace, split, head } from "ramda";

// @repast isCompositeType :: String -> Boolean
export const isCompositeType = pipe(trim, head, equals("{"));

// @repast parseCompositeType :: String -> Object
export const parseCompositeType = pipe(replace(/(\w+)/g, `"$1"`), JSON.parse);

// @repast isUnionType :: String -> Boolean
export const isUnionType = pipe(trim, contains("|"));

// @repast parseUnionType :: String -> [String]
export const parseUnionType = pipe(trim, split("|"));

export const isArrayType = type => typeof type === "string" && pipe(trim, head, equals("["))(type);

export const getArrayType = replace(/\[(\w+)\]/, "$1");
