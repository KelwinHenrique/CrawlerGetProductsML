import httpStatus from 'http-status'

const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || httpStatus.OK).json(entity)
  }
  return null
}

export { success }
