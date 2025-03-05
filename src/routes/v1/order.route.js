const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth(), validate(orderValidation.createOrder), orderController.createOrder);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     description: Admin can retrieve all orders.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Product status
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
 *                         $ref: '#/components/schemas/Order'
 *                       pagination:
 *                         $ref: '#/components/schemas/Pagination'
 *   post:
 *     summary: Create an Order
 *     description: Only admins can create an Order.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
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
 *                   example: Order created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 */
