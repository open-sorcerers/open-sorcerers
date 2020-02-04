import globby from "globby"
import { futurizeWithCancel } from "ensorcel"

export const glob = futurizeWithCancel(() => {}, 1, globby)
