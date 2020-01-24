import Random from 'meteor-random'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => Random.id(5),
  },

  value: {
    type: String,
    required: true,
  },

  ref: {
    type: String,
    required: true,
  },

  expires: { type: Date, expires: '24h', default: Date.now } // expires: '2m'
}, {
  timestamps: true,
  versionKey: '_v',
})

export const Token = mongoose.model('tokens', schema)
