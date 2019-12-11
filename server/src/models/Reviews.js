import { Schema, model } from 'mongoose';

const { Types: { ObjectId } } = Schema;

const Reviews = new Schema({
  home: {
    type: ObjectId,
    ref: 'Homes',
    required: true,
  },
  reservation: {
    type: ObjectId,
    ref: 'Reservations',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'Users',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default model('Reviews', Reviews);
