import { Schema, model } from 'mongoose';

const { Types: { ObjectId } } = Schema;

const Users = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  saved: [{
    type: ObjectId,
    ref: 'Homes',
  }],
  isHost: {
    type: Boolean,
    default: false,
  },
  homes: [{
    type: ObjectId,
    ref: 'Homes',
  }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default model('Users', Users);
