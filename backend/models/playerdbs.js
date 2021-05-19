const { Schema, model } = require('mongoose')

const PlayerdbsSchema = Schema({
  source: String,
  countPlayers: String,
  modifiedPlayers: String,
  addedPlayers: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
  }
})

PlayerdbsSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Playerdbs', PlayerdbsSchema)
