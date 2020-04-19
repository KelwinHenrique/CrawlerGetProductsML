import axios from 'axios'
const cheerio = require('cheerio');
import { ConsoleLogger } from '../../../../../core/services/log'

const getPageResponse = async (search, lastElement) => {
  try {
    const url = `https://lista.mercadolivre.com.br/${search}_Desde_${lastElement}`
    return await axios(url)
  } catch (error) {
    ConsoleLogger().error('ERROR_REQUEST_TO_PAGE', { error: error.message, search, lastElement })
    if (error && error.request && error.request.res && error.request.res.statusCode === 404) {
      return Promise.reject({ customError: 'There are no ads that match your search.' })
    }
    return Promise.reject({ customError: 'Error while make request to page.' })
  }
}

const getSerializedProduct = ($, product) => ({
  name: $(product).find('span.main-title').text(),
  link: $(product).find('.item__info-link').attr('href'),
  price: parseFloat($(product).find('.price__fraction').text() + "." + $(product).find('.price__decimals').text()),
  store: $(product).find('.item__brand-title-tos').text() || '',
  state: $(product).find('.item__status').text() || ''
})

const scrollList = ($, productsTaken, limit) => {
  ConsoleLogger().info('SROLL_LIST_PRODUCTS', { size: productsTaken.length, limit })
  $('.results-item').each((i, product) => {
    const productToken = getSerializedProduct($, product)
    if (productsTaken.length < limit) {
      productsTaken.push(productToken)
    } else {
      return
    }
  })
}

const makeCrawler = async (search, productsTaken, limit) => {
  try {
    const responseHtml = await getPageResponse(search, productsTaken.length)
    const $ = cheerio.load(responseHtml.data)
    scrollList($, productsTaken, limit)
    return {
      finish: false
    }
  } catch (error) {
    if (error.customError === 'There are no ads that match your search.') {
      return {
        finish: true
      }
    }
    return Promise.reject({ customError: error.customError || 'Error when run crawler.' })
  }
}

const getProducts = async (search, limit) => {
  const productsTaken = []
  while (productsTaken.length < limit) {
    const { finish } = await makeCrawler(search, productsTaken, limit)
    if (finish) {
      break
    }

  }
  return productsTaken
}

const crawlerGetProducts = async (search, limit) => {
  try {
    const products = await getProducts(search, limit)
    ConsoleLogger().info('SUCCESS_CRAWLER_PRODUCTS', { products, search, limit })
    return {
      products,
      size: products.length
    }
  } catch (error) {
    ConsoleLogger().error('ERROR_CRAWLER_GET_PRODUCTS', { error, search, limit })
    return Promise.reject({ customError: error.customError || 'Error when running the crawler.' })
  }
}

export { crawlerGetProducts }
