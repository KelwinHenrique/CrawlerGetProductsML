import { Router } from 'express'

const router = new Router()

router.use('/products', () => console.log('Hello'))

export default router
