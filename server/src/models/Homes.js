import { Schema, model } from 'mongoose';

const { Types: { ObjectId } } = Schema;

const Homes = new Schema({
  createdBy: {
    type: ObjectId,
    ref: 'Users',
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'Lagos',
  },
  amenities: [{
    type: String,
    required: true,
  }],
  availableRooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  media: [{
    type: String,
    required: true,
  }],
  averageRating: {
    type: Number,
    required: true,
  },
  reviews: [{
    type: ObjectId,
    ref: 'Reviews',
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default model('Homes', Homes);
