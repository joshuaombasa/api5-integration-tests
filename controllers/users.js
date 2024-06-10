const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    if (!user) {
      return response.sendStatus(404)
    }
    response.send(user)
  } catch (error) {
    next(error)
  }
})


usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body
  try {
    const userObject = new User()
    const users = await User.find({})
    response.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.put('/:id', async (request, response) => {
  const { email, password } = request.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { email, password },
      { new: true })
    response.send(updatedUser)
  } catch (error) {
    next(error)
  }
})


usersRouter.delete('/:id', async (request, response) => {
  try {
    await User.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})




module.exports = usersRouter