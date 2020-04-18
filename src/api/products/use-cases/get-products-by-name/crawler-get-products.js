const crawlerGetProducts = async (search, limit) => {
  try {
    return {
      products: [],
      size: 0
    }
  } catch (error) {
    return Promise.reject({ customError: 'Error when running the crawler.' })
  }
}

export { crawlerGetProducts }
