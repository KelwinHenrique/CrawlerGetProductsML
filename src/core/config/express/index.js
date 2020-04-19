import express from 'express'
import { logMiddleware } from '../../services/middlewares/log'

export default (apiRoot, routes) => {
  const app = express()
  app.use(logMiddleware())
  app.use(apiRoot, routes)
  app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send(err.error)
    } else {
      next(err)
    }
  })

  return app
}
