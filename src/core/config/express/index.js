import express from 'express'
import bodyParser from 'body-parser'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { logMiddleware } from '../../services/middlewares/log'

export default (apiRoot, routes) => {
  const app = express()
  app.use(logMiddleware())
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(apiRoot, routes)
  app.use(bodyErrorHandler())
  app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send(err.error)
    } else {
      next(err)
    }
  })

  return app
}
