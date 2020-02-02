export { version } from "../package.json"
export const name = "ensorcel"
export { uncurryN } from "ramda"
export {
  futurizeWithCancel,
  unfuturize,
  downgrade,
  FLUTURE_METHOD_ARITIES
} from "./future"
export { freeze, j2 } from "./utils"
