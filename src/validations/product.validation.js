const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    limit: Joi.number(),
    flashSalePercent: Joi.number().min(0).max(100).required(),
    mediaIds: Joi.array().items(Joi.string()),
    flashSaleStarts: Joi.date().required(),
  }),
};

const restockProduct = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.string(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const updateProductById = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    flashSaleStarts: Joi.date(),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  getProducts,
  restockProduct,
};
