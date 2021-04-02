const { Schema, model } = require('mongoose')

const ScoreSchema = Schema({
  match: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  homeTeam: Boolean,
  awayTeam: Boolean
})

ScoreSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Score', ScoreSchema)
