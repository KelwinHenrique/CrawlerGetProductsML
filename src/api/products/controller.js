import { getProductsByName } from './use-cases'
import { success } from '../../core/services/response'

const processGetProductsByName = ({ querymen: { cursor, query } }, res, next) => (
  getProductsByName(cursor, query)
    .then(success(res))
    .catch(error => next(error))
)

const productsController = {
  processGetProductsByName
}

export { productsController }
