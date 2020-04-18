import { Router } from 'express'
import { productsController } from './controller'
import { middleware as query } from 'querymen'

const productsRouter = new Router({ mergeParams: true })

productsRouter.get('/',
  query({
    search: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true,
      max: 100000
    },
  }),
  productsController.processGetProductsByName
)

export { productsRouter }
