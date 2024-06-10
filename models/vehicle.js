const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  isAvailable: { type: Boolean, default: false },
})

vehicleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject_id.toString()

    returnedObject._id
    returnedObject.__v
  }
})

module.exports = vehicleSchema