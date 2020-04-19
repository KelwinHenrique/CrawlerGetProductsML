<a name="top"></a>
# Crawler ML v0.1.0

Api Doc for Crawler that get products of ML

- [Products](#Products)
	- [Request Products information](#Request-Products-information)
	


# <a name='Products'></a> Products

## <a name='Request-Products-information'></a> Request Products information
[Back to top](#top)

```
POST /products
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| search | `String` | <p>Text to search products</p> |
| limit | `Number` | <p>Limit of products to return</p> |

### Parameters examples
`json` - Request-Example:

```json
{
   "search":"cadeado",
   "limit": 1
}
```

### Success response

#### Success response - `Success 200`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| products | `Array` | <p>List of products.</p> |
| products.name | `String` | <p>Product's name.</p> |
| products.link | `String` | <p>Product's link.</p> |
| products.price | `Number` | <p>Product's price.</p> |
| products.store | `String` | <p>Product's stre.</p> |
| products.state | `String` | <p>Product's state.</p> |
| size | `Number` | <p>Count of products returned.</p> |

### Success response example

#### Success response example - `Success-Response:`

```
HTTP/1.1 200 OK
{
  "size": 1,
  "products": {
     name: "Cadeado Mesmo Segredo 25mm Zamac Stam",
     link: "https://produto.mercadolivre.com.br/MLB-1051471391-cadeado-mesmo-segredo-25mmzamac-stam",
     price: 22.80,
     store: "O construtor",
     state: null,
  }
}
```

### Error response

#### Error response - `Error 4xx`
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| UserNotFound |  | <p>The id of the User was not found.</p> |

### Error response example

#### Error response example - `Error-Response:`

```
HTTP/1.1 400 Not Found
{
  "message": "Error while get products."
}
```
