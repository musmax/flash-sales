const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Order } = require('../models/order.model');
const { productService } = require('../services');
const { User } = require('../models');


/**
 * helper function to generate random 10characters using uppercase, lowercase, number
 */
const generaterandomCharacter = async (length) => {
  const alphaNumeric = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * alphaNumeric.length);
    randomString += alphaNumeric[index];
  }
  return randomString;
}


/**
 * Create an order
 * @params {Object} orderBody
 * @params {string} orderBody.productId
 * @params {string} orderBody.quantity
 */
const createOrder = async (orderBody, userId) => {
  const { productId, quantity } = orderBody;
  // Check if product exists
  const product = await productService.getProductById(productId);
  // Validate stock
  if (product.stock === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Flash sales has ended as we are out of stock');
  }
  // lets see if limit is set and ensure we can buy above the limit
  if (product.limit && product.limit > 0) {
    if (quantity > product.limit) {
      throw new ApiError(httpStatus.BAD_REQUEST, `You can only buy up to ${product.limit} items`)
    }
  }

  // Validate quantity
  if (quantity > product.stock) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Quantity is more than available stock');
  }

  // Validate flash sale timing
  if (!product.flashSaleStarts || new Date() < new Date(product.flashSaleStarts)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Flash sale has not begun');
  }

  // Generate order reference
  const orderReference = await generaterandomCharacter(8);

  // Ensure price is a number and calculate amounts
  const amount = Number(product.price);
  const discountAmount = Number((amount * product.flashSalePercent) / 100);
  const amountPaid = Number(amount - discountAmount);

  // Create order
  const order = await Order.create({
    ...orderBody,
    amount: amount,
    quantity: quantity,
    discountAmount: discountAmount,
    amountPaid: amountPaid,
    reference: orderReference,
    userId: userId,
    status: 'success',
    productId: product._id
  });

  // Update product stock
  product.stock -= quantity;
  await product.save();

  return order;
};

/**
 * query order
 */
const getOrders = async (options = {}, filter = {}) => {
  // Set default pagination values if not provided
  const page = options.page || 1;
  const paginate = options.paginate || 10;
  const skip = (page - 1) * paginate;

  // Build query with filter
  const query = {};
  if (filter.reference) query.reference = filter.reference;
  if (filter.userId) query.userId = filter.userId;
  if (filter.productId) query.productId = filter.productId;
  if (filter.status) query.status = filter.status;

  if (filter.firstName || filter.lastName || filter.email) {
    query.userId = await User.find({
      ...(filter.firstName && { firstName: filter.firstName }),
      ...(filter.lastName && { lastName: filter.lastName }),
      ...(filter.email && { email: filter.email })
    }).select('_id');
  }

  const orders = await Order.find(query)
    .populate('userId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(paginate);

  const total = await Order.countDocuments(query);

  return {
    orders,
    currentPage: page,
    totalPages: Math.ceil(total / paginate),
    totalOrders: total
  };
};

module.exports = {
  createOrder,
  getOrders
};
