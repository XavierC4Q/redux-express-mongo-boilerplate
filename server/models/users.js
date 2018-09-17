const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
})

UserSchema.plugin(passportLocalMongoose)


const Users = mongoose.model('Users', UserSchema)

module.exports = Users
