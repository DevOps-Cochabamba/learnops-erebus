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
  },
  description: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    enum: ['draft', 'published', 'deprecated'],
    default: 'draft',
  },
  icon: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: false,
  },
  control: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  simulator: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  actions: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: '_v',
})

export const Type = mongoose.model('types', schema)
