const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  limit: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 200
  },
  flashSalePercent: {
    type: Number,
  },
  flashSaleStarts: {
    type: Date,
    required: true,
  },
  mediaIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

});

// 👇 Define the virtual field for `flashSales`
productSchema.virtual('flashSales', {
  ref: 'ProductFlashSale',
  localField: '_id',
  foreignField: 'productId'
});

// Ensure virtuals are included when converting documents to JSON or Objects
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });
/**
 * @typedef product
 */
const Product = mongoose.model('Product', productSchema);
module.exports = {
  Product,
};
