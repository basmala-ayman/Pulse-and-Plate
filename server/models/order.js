const mongoose = require('mongoose');
// const schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  user: {                               
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Item',
  },
  quantity: {
    type: Number,
    required: true,
    default:1
  },
  happenedAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Order', orderSchema);
