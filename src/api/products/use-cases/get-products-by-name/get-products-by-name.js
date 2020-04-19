import { serializeError } from '../../../../core/services/serializers'
import { crawlerGetProducts } from './crawler-get-products'
import { ConsoleLogger } from '../../../../core/services/log'

const getProducts = async (cursor, query) => {
  try {
    const { limit } = cursor
    const { search } = query
    return await crawlerGetProducts(search, limit)
  } catch (error) {
    return Promise.reject({ customError: error.customError || 'It was not possible to search for products.' })
  }
}

const getProductsByName = async (cursor, query) => {
  try {
    ConsoleLogger().info('START_GET_PRODUCTS_BY_NAME', { cursor, query})
    const objectResponse = await getProducts(cursor, query)
    return objectResponse
  } catch (error) {
    ConsoleLogger().error('ERROR_GET_PRODUCTS_BY_NAME', { error, cursor, query})
    return Promise.reject(serializeError(error, 'Error when get products.' ))
  }

}

export { getProductsByName }
