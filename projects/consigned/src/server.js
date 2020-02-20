import path from "path"
import GitServer from "node-git-server"

export const server = (config = {}) => {
  const {
    port: PORT = process.env.PORT || 6699,
    basepath = path.resolve(process.cwd(), "tmp"),
    autoCreate = true,
    log = console.log
  } = config
  const GG = new GitServer(basepath, { autoCreate })
  GG.on("push", push => {
    log(`PUSHED ${push.repo}/${push.commit} (${push.branch})`, push)
    push.accept()
  })
  GG.on("fetch", fetch => {
    log(`FETCHED ${fetch.commit}`, fetch)
    fetch.accept()
  })
  GG.listen(PORT, () => log(`CONSIGNED`))
}
