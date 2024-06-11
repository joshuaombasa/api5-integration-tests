const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: Number, required: true },

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject_id.toString()

    returnedObject._id
    returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)