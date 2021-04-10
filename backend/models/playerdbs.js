const { Schema, model } = require('mongoose')

const PlayerdbsSchema = Schema({
  source: String
})

PlayerdbsSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Playerdbs', PlayerdbsSchema)
