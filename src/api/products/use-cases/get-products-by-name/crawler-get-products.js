import axios from 'axios'
const cheerio = require('cheerio');

const getPageResponse = async (search, lastElement) => {
  try {
    const url = `https://lista.mercadolivre.com.br/${search}_Desde_${lastElement}`
    return await axios(url)
  } catch (error) {
    if(error && error.request && error.request.res && error.request.res.statusCode === 404) {
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
  } catch (error) {
    return Promise.reject({ customError: error.customError || 'Error when run crawler.' })
  }
}

const getProducts = async (search, limit) => {
  try {
    const productsTaken = []
    while(productsTaken.length < limit) {
      await makeCrawler(search, productsTaken, limit)
    }
    return productsTaken
  } catch (error) {
    return Promise.reject({ customError: error.customError || 'Error when get products by page.' })
  }
}

const crawlerGetProducts = async (search, limit) => {
  try {
    const products = await getProducts(search, limit)
    return {
      products,
      size: products.length
    }
  } catch (error) {
    return Promise.reject({ customError: error.customError || 'Error when running the crawler.' })
  }
}

export { crawlerGetProducts }
