import httpStatus from 'http-status'

const getDefaultErrorObject = (message) => ({
  status: httpStatus.BAD_REQUEST,
  error: {
    message: message
  }
})

const serializeError = (error, defaultMessage) => (
  error && error.customError ? getDefaultErrorObject(error.customError) : getDefaultErrorObject(defaultMessage)
)

export { serializeError }
