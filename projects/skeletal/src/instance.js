import { bold } from "kleur"
import { pipe } from "./utils"
import PKG from "../package.json"
export const nameAndVersion = () => PKG.name + PKG.version
export const nameVersion = pipe(nameAndVersion, bold)
