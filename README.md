# Crawler ML

Crawler capable of searching for a list of products, given a search field (search) and a limit of products to be returned.

This api contains:

- Unit and integration tests;
- Log system;
- Based on clean architecture;
- [Documentation.](https://github.com/KelwinHenrique/CrawlerGetProductsML/blob/master/DOCS.md)

## How to run the project

1) Run `npm i` to install all the dependencies of the project.

2) Run `npm run star:dev` to initialize the api.

3) Run the comand bellow in your terminal:
```json
  curl -d '{ "search":"cadeado", "limit":10 }' -H "Content-Type: application/json" -X POST http://localhost:3000/api/products
```

## How to run tests

Run `npm run test` to execute all(unit and integrations) tests of the api.

## How to run documentation

1) Run `npm run docs` to create the documentation.

2) Enter the folder coverage/lcov-report and execute index.html

3) Or you can click [here](https://github.com/KelwinHenrique/CrawlerGetProductsML/blob/master/DOCS.md)

## Architecture

```bash
├── src
│   ├── api
│   │   ├── products
│   │   │   ├── use-case
│   │   │   │   ├── get-products-by-name
│   │   │   │   │   ├── get-products-by-name.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── get-products-by-name.test.js
│   │   │   │   ├── index.js
│   │   │   ├── services
│   │   │   │   ├── crawler-get-products
│   │   │   │   │   ├── crawler-get-products.js
│   │   │   │   │   ├── crawler-get-products.test.js
│   │   │   │   │   ├── index.js
│   │   │   │   ├── index.js
│   │   │   ├── index.js
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   ├── index.js
│   ├── core
│   │   ├── config
│   │   │   ├── express
│   │   │   │   ├── index.js
│   │   ├── services
│   │   │   ├── log
│   │   │   │   ├── index.js
│   │   │   │   ├── logger.js
│   │   │   ├── middleware
│   │   │   │   ├── log
│   │   │   │   │   ├── index.js
│   │   │   ├── response
│   │   │   │   ├── index.js
│   │   │   ├── serializers
│   │   │   │   ├── errors.js
│   │   │   │   ├── index.js
├── app.js
├── config.js
├── index.js
├── __tests__
│   ├── integrations
│   │   ├── products
│   │   │   ├── get-products-by-search.test.js
```

## Main Dependencies

- express: Web framework.
- jest and supertest: Unit test and integration test.
- apiDoc and apidoc-markdown: To create documentation for this API.
- winston and stack-trace: To create logs for this API.

