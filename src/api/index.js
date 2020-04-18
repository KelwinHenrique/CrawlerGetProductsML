import { Router } from 'express'
import { productsRouter } from './products'

const router = new Router()

router.use('/products', productsRouter)

export default router
