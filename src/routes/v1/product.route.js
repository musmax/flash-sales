const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/restock')
  .post(auth(), validate(productValidation.restockProduct), productController.restockProduct);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProductById)
  .patch(auth(), validate(productValidation.updateProductById), productController.updateProductById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Admin can retrieve all products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: price of product
 *       - in: query
 *         name: paginate
 *         schema:
 *           type: integer
 *         description: page limit
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: page
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Companies fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     properties:
 *                       companies:
 *                         $ref: '#/components/schemas/Product'
 *                       pagination:
 *                         $ref: '#/components/schemas/Pagination'
 *   post:
 *     summary: Create a product
 *     description: Only admins can create product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/restock:
 *   post:
 *     summary: Restock a product
 *     description: Only admins can Restock product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRestock'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ProductRestock created successfully
 *                 data:
 *                   $ref: '#/components/schemas/ProductRestock'
 */


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product
 *     description: Only admins can fetch products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         description: Forbidden
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/Forbidden'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update product
 *     description: Only admins can update product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company updated successfully
 */
