const { Schema, model } = require('mongoose')

const NotificationSchema = Schema({
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  desc: String ,
  // type 1 = admin, type 2 = users, type 3 = user
  type: Number,
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

NotificationSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Notification', NotificationSchema)
