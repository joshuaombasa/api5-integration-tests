const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')
const vehiclesRouter = require('./controllers/vehicles')

mongoose.connect(config.MONGO_URI)
     .then(() => logger.info(`connected to mongodb`))
     .catch(error => logger.error(error))




const app = express()
app.use(express.json())
app.use(cors())

app.use(middleware.requestLOgger)

app.use('/api/users', usersRouter)
app.use('/api/vehicles', vehiclesRouter)
// app.use('/api/vehicles', (request,response) => {
//      response.send({})
// })

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)


module.exports = app