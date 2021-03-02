const { Schema, model } = require('mongoose')

const TournamentSchema = Schema({
  tournamentName: {
    type: String,
    required: true
  },
  img: String,
  completed: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    default: 'double_round_robin'
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

TournamentSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Tournament', TournamentSchema)
