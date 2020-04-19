import { serializeError } from '../../../../core/services/serializers'
import { crawlerGetProducts } from '../../services'
import { ConsoleLogger } from '../../../../core/services/log'

const getProducts = async (limit, search) => {
  try {
    return await crawlerGetProducts(search, limit)
  } catch (error) {
    return Promise.reject({ customError: error.customError || 'It was not possible to search for products.' })
  }
}

const getProductsByName = async (body) => {
  try {
    ConsoleLogger().info('START_GET_PRODUCTS_BY_NAME', { body })
    const { limit, search } = body
    const objectResponse = await getProducts(limit, search)
    return objectResponse
  } catch (error) {
    ConsoleLogger().error('ERROR_GET_PRODUCTS_BY_NAME', { error, body })
    return Promise.reject(serializeError(error, 'Error while get products.' ))
  }

}

export { getProductsByName }
