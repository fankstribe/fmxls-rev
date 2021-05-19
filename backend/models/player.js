const { Schema, model } = require('mongoose')

const PlayerSchema = Schema({
  playerId: Number,
  img: String,
  playerName: String,
  age: Number,
  position: String,
  overall: Number,
  value: String,
  wage: String,
  source: String
  // team: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Team'
  // },
  // score: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Score'
  // },
})

PlayerSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Player', PlayerSchema)
