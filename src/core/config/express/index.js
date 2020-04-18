import express from 'express'

export default (apiRoot, routes) => {
  const app = express()

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
