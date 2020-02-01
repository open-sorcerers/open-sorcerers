import { memo } from "./utils"
import { REGEX_HEX3, REGEX_HEX6 } from "./constants"

export const testHex = memo(
  z =>
    z &&
    (z.length === 3 || z.length === 6) &&
    (REGEX_HEX3.test(z) || REGEX_HEX6.test(z))
)
export const noHexLead = memo(h => h && h[0] !== "#")
export const noParens = memo(h => h && h.includes && !h.includes("("))
