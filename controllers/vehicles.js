const express = require('express')
const vehiclesRouter = express.Router()
const Vehicle = require('../models/vehicle')


vehiclesRouter.get('/', async (request, response, next) => {
  try {
    const vehicles = await Vehicle.find({})

    response.send(vehicles)
  } catch (error) {
    next(error)
  }
})

vehiclesRouter.get('/:id', async (request, response, next) => {
  try {
    const vehicle = await Vehicle.findById(request.params.id)
    if (!vehicle) {
      return response.sendStatus(404)
    }
    response.send(vehicle)
  } catch (error) {
    next(error)
  }
})

vehiclesRouter.post('/', async (request, response, next) => {
  const { name, price, size, isAvailable } = request.body
  try {
    const vehicleObject = new Vehicle({ name, price, size, isAvailable })
    const savedVehicle = await vehicleObject.save()
    response.status(201).send(savedVehicle)
  } catch (error) {
    next(error)
  }
})

vehiclesRouter.put('/:id', async (request, response, next) => {

  const { name, price, size, isAvailable } = request.body

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      request.params.id,
      { name, price, size, isAvailable },
      { new: true }
    )
    response.send(updatedVehicle)
  } catch (error) {
    next(error)
  }
})

vehiclesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Vehicle.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})


module.exports = vehiclesRouter
