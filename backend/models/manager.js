const { Schema, model } = require('mongoose')

const ManagerSchema = Schema({
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  team: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ManagerSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Manager', ManagerSchema)
