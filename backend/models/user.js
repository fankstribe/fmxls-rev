const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthDate: Date,
  img: String,
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  assignedTeam: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.method('toJSON', function() {
  const {__v, _id, password, ...object} = this.toObject()

  object.uid = _id
  return object
})

module.exports = model('User', UserSchema)
