const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test.helper')
const Vehicle = require('../models/vehicle')

beforeEach(async () => {
  await Vehicle.deleteMany({})

  for (let vehicle of helper.vehiclesData) {
    const vehicleData = new Vehicle(vehicle)
    await vehicleData.save()
  }
})


describe('when there are initially some vehicles saved', () => {
  test('vehicles are returned as JSON', async () => {
    const response = await api.get('/api/vehicles')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})




afterAll(async () => {
  await mongoose.connection.close()
})