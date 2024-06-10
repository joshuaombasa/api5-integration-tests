
const logger = require('./logger')

const requestLOgger = (request, response,next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('___')
  next()
}

const unknownEndpointHandler = (request, response) => {
  response.status(404).json({ errors: { message: 'Not Found' } })
}

const errorHandler = (request, response) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ errors: { message: error.message } })
  }

  if (error.name === 'ValidationError') {
    response.status(400).send({ errors: { message: error.message } })
  }

  response.status(400).send({ errors: { message: 'Something went wrong' } })
}

module.exports = { unknownEndpointHandler, errorHandler, requestLOgger }