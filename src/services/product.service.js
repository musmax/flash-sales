const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models/products.model');
const { Mongoose } = require('mongoose');

/**
 * Get all Products
 * @param {Object} filter
 * @returns {Promise<Product[]>}
 */
const getAllProducts = async (filter) => {
  return Product.find(filter);
};

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

/**
 * Create Product
 * @param {Object} ProductBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody, userId) => {
  const { flashSaleStarts } = productBody;
  // lets ensure that flash sales is nit configure to be a date in the past
  if (flashSaleStarts && new Date(flashSaleStarts) < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Flash sale start date cannot be in the past')
  }
  const product = await Product.create({ ...productBody, userId });
  return product;
};


/**
 * Update Product by id
 * @param {ObjectId} ProductId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (ProductId, updateBody) => {
  const product = await getProductById(ProductId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Restock Product
 * @param {Object} productRestockBody
 * @returns {Promise<Product>}
 */
const restockProduct = async (productRestockBody) => {
  const { productId, quantity } = productRestockBody;
  const product = await getProductById(productId);
  // lets ensure that the items is out of stock at that moment
  if (product.stock !== 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product is not out of stock')
  }
  // lets ensure that flash sales is still ongoing
  if (!product.flashSaleStarts || new Date(product.flashSaleStarts.endDate) < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Flash sale has ended or has not begun');
  }
  // lets reset the totalPurchase back to zero by updating the product totalPurchase
  product.stock = quantity;
  product.save();
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  restockProduct,
};
