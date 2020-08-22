import { C, L } from "./constants"
const { __of__ } = C
export function system(z) {
  let constructor = (z && z.constructor && z.constructor.name) || L.Global
  let type = typeof z
  if (!z) {
    if (type === L.string) {
      constructor = L.String
    } else if (type === L.undefined || type === L.object) {
      type = L.nil
    } else {
      constructor = L.Boolean
    }
  }
  return `${constructor}${__of__}${type}`
}
export default system
