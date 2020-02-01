import { memo } from "./utils"
import { noHexLead, noParens } from "./predicates"

export const convert = memo(x =>
  noHexLead(x) ? (noParens(x) ? x : "") : x.slice(1)
)
