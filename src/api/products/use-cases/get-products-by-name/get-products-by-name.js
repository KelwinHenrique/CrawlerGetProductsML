import { serializeError } from '../../../../core/services/serializers'

const getProductsByName = async (cursor, query) => {
  try {
    return { success: 'ok', cursor, query }
  } catch (error) {
    return Promise.reject(serializeError(error, 'Erro ao cadastrar usuário.' ))
  }

}

export { getProductsByName }
