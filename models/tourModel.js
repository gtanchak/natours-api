// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tours must have a name'],
    uniq: true,
  },
  rating: {
    type: Number,
    default: 5.12,
  },
  price: {
    type: Number,
    required: [true, 'A tours must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
