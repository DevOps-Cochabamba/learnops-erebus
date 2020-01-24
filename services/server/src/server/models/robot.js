import Random from 'meteor-random'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => Random.id(),
  },

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    default: () => 'Erebus',
  },
  description: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
    default: () => '81',
  },
  mode: {
    type: String,
    required: false,
  },
  stream: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: true,
    default: () => Random.id(),
  },

  source: {
    type: String,
    enum : ['robot', 'web'],
    default: 'robot'
  },
  salt: {
    type: String,
    require: false
  },
  passwordHash: {
    type: String,
    require: false
  },

  typeId: {
    type: String,
    required: function() {
      return this.source === 'web'
    },
    minlength: 10,
    maxlength: 20,
  },
  userId: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
  versionKey: '_v',
})

export const Robot = mongoose.model('robots', schema)
