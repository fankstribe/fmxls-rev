const { Schema, model } = require('mongoose')

const TeamSchema = Schema({
  teamName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  img: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tournaments: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  matches: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }
})

TeamSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Team', TeamSchema)
