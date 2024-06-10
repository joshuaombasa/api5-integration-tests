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


module.exports = usersRouter