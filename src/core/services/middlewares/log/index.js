import { ConsoleLogger } from "../../log"

const logMiddleware = () => {
  return (req, res, next) => {
    if (req && res) {
      ConsoleLogger().info('NEW REQUEST', {
        path: req.url,
        method: req.method,
        params: req.params,
        query: req.query
      })
      next()
    }
  }
}

export {
  logMiddleware
}
