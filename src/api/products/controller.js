import { getProductsByName } from './use-cases'
import { success } from '../../core/services/response'

const processGetProductsByName = ({ bodymen: { body } }, res, next) => (
  getProductsByName(body)
    .then(success(res))
    .catch(error => next(error))
)

const productsController = {
  processGetProductsByName
}

export { productsController }
