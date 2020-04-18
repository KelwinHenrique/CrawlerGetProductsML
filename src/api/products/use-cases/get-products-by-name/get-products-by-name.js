const getProductsByName = async (cursor, query) => {
  return { success: 'ok', cursor, query }
}

export { getProductsByName }
