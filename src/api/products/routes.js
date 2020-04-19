import { Router } from 'express'
import { productsController } from './controller'
import { middleware as query } from 'querymen'

const productsRouter = new Router({ mergeParams: true })

/**
 * @api {post} /products Request Products information
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiParam {String} search Text to search products
 * @apiParam {Number} limit Limit of products to return
* @apiParamExample {json} Request-Example:
 * {
 *    "search":"cadeado",
 *    "limit": 1
 * }
 *
 * @apiSuccess {Array} products List of products.
 * @apiSuccess {String} products.name Product's name.
 * @apiSuccess {String} products.link Product's link.
 * @apiSuccess {Number} products.price Product's price.
 * @apiSuccess {String} products.store Product's stre.
 * @apiSuccess {String} products.state Product's state.
 * @apiSuccess {Number} size  Count of products returned.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "size": 1,
 *       "products": {
 *          name: "Cadeado Mesmo Segredo 25mm Zamac Stam",
 *          link: "https://produto.mercadolivre.com.br/MLB-1051471391-cadeado-mesmo-segredo-25mmzamac-stam",
 *          price: 22.80,
 *          store: "O construtor",
 *          state: null,
 *       }
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Error while get products."
 *     }
 */
productsRouter.get('/',
  query({
    search: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true,
      max: 100000
    },
  }),
  productsController.processGetProductsByName
)

export { productsRouter }
