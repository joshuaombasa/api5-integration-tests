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

  test('all vehicles are returned', async () => {
    const response = await api.get('/api/vehicles')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.vehiclesData.length)
  })

  test('a specific vehicle is amonng the vehicles that are returned ', async () => {
    const response = await api.get('/api/vehicles')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const names = response.body.map(r => r.name)
    expect(names).toContain(helper.vehiclesData[0].name)
  })
})

describe('getting a specific vehicle', () => {
  test('succeeds with statuscode 200 when given a valid id', async () => {
    const vehiclesInDb = await helper.vehiclesInDb()
    const response = await api.get(`/api/vehicles/${vehiclesInDb[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('fails with statuscode 400 when given an invalid id', async () => {
    const response = await api.get(`/api/vehicles/-03094`)
      .expect(400)
  })

  test('fails with statuscode 404 when given a nonexistent id', async () => {
    const nonExistentId = await helper.nonExistentId()
    const response = await api.get(`/api/vehicles/${nonExistentId}`)
      .expect(404)
  })
})

describe('addition of a new vehicle ', () => {
  test('works when given valid data', async () => {
    const response = await api.post('/api/vehicles')
      .send({
        name: 'vehicle6',
        price: '600',
        size: 'small',
        isAvailable: false
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with statuscode 400 when given invalid data', async () => {
    const response = await api.post('/api/vehicles')
      .send({
        name: 'vehicle7',
        isAvailable: false
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deleting a vehicle', () => {
  test('works when given a valid id', async() => {
    const vehiclesInDb = await helper.vehiclesInDb()
    console.log(vehiclesInDb[0].id)
    const response = await api.delete(`/api/vehicles/${vehiclesInDb[0].id}`)
    .expect(204)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})