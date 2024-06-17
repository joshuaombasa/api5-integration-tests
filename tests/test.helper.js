const vehicle = require('../models/vehicle')
const Vehicle = require('../models/vehicle')

const vehiclesData = [{
  name: 'vehicle1',
  price: '100',
  size: 'small',
  isAvailable: false
},
{
  name: 'vehicle2',
  price: '200',
  size: 'small',
  isAvailable: false
},
{
  name: 'vehicle3',
  price: '100',
  size: 'small',
  isAvailable: false
},
{
  name: 'vehicle4',
  price: '400',
  size: 'small',
  isAvailable: false
},
{
  name: 'vehicle5',
  price: '500',
  size: 'small',
  isAvailable: false
},
]

const nonExistentId = async () => {
  const vehicleObject = new Vehicle({
    name: 'vehicle6',
    price: '600',
    size: 'small',
    isAvailable: false
  })

  const savedVehicle = await vehicleObject.save()
  await Vehicle.findByIdAndDelete(savedVehicle._id)
  return savedVehicle._id.toString()
}

const vehiclesInDb = async () => {
  const vehiclesRaw = await Vehicle.find({})
  return vehiclesRaw.map(vehicle => vehicle.toJSON())

}



module.exports = { vehiclesData, vehiclesInDb, nonExistentId }