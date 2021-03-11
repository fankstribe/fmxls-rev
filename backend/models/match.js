const { Schema, model } = require('mongoose')

const MatchSchema = Schema({
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  round: Number,
  completed: {
    type: Boolean,
    default: false
  }
})

MatchSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Match', MatchSchema)
