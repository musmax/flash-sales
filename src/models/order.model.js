const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  reference: {
    type: String,
    maxlength: 255,
  },
  status: {
    type: String,
  },
  amount: {
    type: Number,
    maxlength: 255,
  },
  discountAmount: {
    type: Number,
  },
  amountPaid: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};
