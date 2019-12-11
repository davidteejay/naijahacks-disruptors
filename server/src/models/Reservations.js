import { Schema, model } from 'mongoose';

const { Types: { ObjectId } } = Schema;

const Reservations = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  home: {
    type: ObjectId,
    ref: 'Homes',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'Users',
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default model('Reservations', Reservations);
