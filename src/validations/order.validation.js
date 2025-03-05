const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }),
};

module.exports = {
  createOrder,
};
