import { server } from './../../../src/app'
const request = require('supertest')

describe("Integration test getProductsBySearch", () => {

  test("getProductsBySearch should return 200 when all is ok.", async () => {

    const body = {
      search: "cadeado",
      limit: 5
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

    expect(response.status).toBe(200)

  })

  test("getProductsBySearch should return 400 when don\'t send search.", async () => {

    const body = {
      limit: 5
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

    expect(response.status).toBe(400)

  })

  test("getProductsBySearch should return 400 when don\'t send limit.", async () => {

    const body = {
      search: "cadeado"
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

    expect(response.status).toBe(400)

  })

  test("getProductsBySearch should return name, link and price.", async () => {

    const body = {
      search: "cadeado",
      limit: 5
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

      expect(response.body.products[0].name).not.toBeNull()
      expect(response.body.products[0].link).not.toBeNull()
      expect(response.body.products[0].price).not.toBeNull()
      expect(response.body.products[0].name).not.toBeUndefined()
      expect(response.body.products[0].link).not.toBeUndefined()
      expect(response.body.products[0].price).not.toBeUndefined()

  })

  test("getProductsBySearch should return name, link and price.", async () => {

    const body = {
      search: "cadeado",
      limit: 5
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

      expect(response.body.products[0].name).not.toBeNull()
      expect(response.body.products[0].link).not.toBeNull()
      expect(response.body.products[0].price).not.toBeNull()
      expect(response.body.products[0].name).not.toBeUndefined()
      expect(response.body.products[0].link).not.toBeUndefined()
      expect(response.body.products[0].price).not.toBeUndefined()

  })

  test("getProductsBySearch should return size equal 100", async () => {

    const body = {
      search: "chaveiro",
      limit: 100
    }
    const response = await request(server)
      .post('/api/products')
      .send(body)

      expect(response.body.size).toBe(100)

  })
})
