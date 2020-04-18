import { serializeError } from '../../../../core/services/serializers'
import { crawlerGetProducts } from './crawler-get-products'

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
    const objectResponse = await getProducts(cursor, query)
    return objectResponse
  } catch (error) {
    return Promise.reject(serializeError(error, 'Error when get products.' ))
  }

}

export { getProductsByName }
