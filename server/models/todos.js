const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const schema = mongoose.Schema

const TodoSchema = new schema({
  task: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  }
})

const Todos = mongoose.model('Todos', TodoSchema)

module.exports = Todos
