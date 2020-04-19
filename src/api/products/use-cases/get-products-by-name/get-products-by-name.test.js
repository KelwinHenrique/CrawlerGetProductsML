import { getProductsByName } from './get-products-by-name'
import * as crawler from '../services'

const objectExpectedInReturn = () => (
  {
    size: 1,
    products: [
      {
        name: 'Cadeado de bicicleta',
        link: 'https://produto.mercadolivre.com.br/MLB-1051471391-cadeado-mesmo-segredo-25mmzamac-stam',
        price: 20,
        store: 'Kalunga',
        state: 'São Paulo',
      }
    ]
  }
)

const body = {
  limit: 1,
  search: 'Cadeado'
}

describe("Unit Test getProductsByName", () => {

  beforeEach(async () => {

    crawler.crawlerGetProducts = jest.fn(() => (
      {
        size: 1,
        products: [
          {
            name: 'Cadeado de bicicleta',
            link: 'https://produto.mercadolivre.com.br/MLB-1051471391-cadeado-mesmo-segredo-25mmzamac-stam',
            price: 20,
            store: 'Kalunga',
            state: 'São Paulo',
          }
        ]
      }
    ))
  })

  test('get-products-by should return expected object contract', async () => {
    const responseGetProducts = await getProductsByName(body)

    expect(responseGetProducts).toEqual(objectExpectedInReturn())
  })

  test('get-products-by should return error when anything wrong happens with crawlerGetProducts', async () => {

    const expectAssertValue = 1
    crawler.crawlerGetProducts = jest.fn(() => {
      throw new TypeError()
    })

    expect.assertions(expectAssertValue)

    return getProductsByName(body).catch(err =>
      expect(err.error.message).toEqual('It was not possible to search for products.')
    )
  })

  test('get-products-by should return error when don\'t send body', async () => {

    const expectAssertValue = 1

    expect.assertions(expectAssertValue)

    return getProductsByName().catch(err =>
      expect(err.error.message).toEqual('Error while get products.')
    )
  })

})
