import { crawlerGetProducts } from './crawler-get-products'


const limit =  1
const search = 'cadeado'

describe("Unit Test crawlerGetProducts", () => {

  test('crawler-get-products should return name, url and price', async () => {
    const responseCrawlerGetProducts = await crawlerGetProducts(search, limit)

    expect(responseCrawlerGetProducts.products[0].name).not.toBeNull()
    expect(responseCrawlerGetProducts.products[0].link).not.toBeNull()
    expect(responseCrawlerGetProducts.products[0].price).not.toBeNull()
    expect(responseCrawlerGetProducts.products[0].name).not.toBeUndefined()
    expect(responseCrawlerGetProducts.products[0].link).not.toBeUndefined()
    expect(responseCrawlerGetProducts.products[0].price).not.toBeUndefined()
  })

  test('crawler-get-products should return size less Or Equal limit', async () => {
    const responseCrawlerGetProducts = await crawlerGetProducts(search, limit)

    expect(responseCrawlerGetProducts.size).toBeLessThanOrEqual(limit)
  })

  test('crawler-get-products should return url with http', async () => {
    const responseCrawlerGetProducts = await crawlerGetProducts(search, limit)
    expect(responseCrawlerGetProducts.products[0].link).toContain('http')
  })

  test('crawler-get-products should return empty array of products  when don\'t find ads', async () => {

    const responseCrawlerGetProducts = await crawlerGetProducts('gfdghjdghjsfghjghmnhjkghjk', 24)
    expect(responseCrawlerGetProducts.products.length).toEqual(0)
  })

  test('crawler-get-products should return size equal to products.length', async () => {
    const responseCrawlerGetProducts = await crawlerGetProducts(search, 24)
    expect(responseCrawlerGetProducts.products.length).toEqual(responseCrawlerGetProducts.size)
  })

})
