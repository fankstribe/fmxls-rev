const { Schema, model } = require('mongoose')

const GoalSchema = Schema({
  match: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  scorer: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
   },
  homeTeam: Boolean,
  awayTeam: Boolean
})

GoalSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Goal', GoalSchema)
