const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const pick = require('../utils/pick');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['reference', 'userId', 'productId', 'status', 'firstName', 'lastName', 'email']);
  const options = pick(req.query, ['paginate', 'page']);
  const orders = await orderService.getOrders(options, filter);
  res.status(httpStatus.OK).send(orders);
});

module.exports = {
  createOrder,
  getOrders,
};
