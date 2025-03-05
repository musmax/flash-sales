const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/').get(auth(),
    // validate(orderValidation.createOrder),
    orderController.getOrders);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard management and retrieval
 */

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Get all Leaderboards
 *     description: Admin can retrieve all Leaderboards.
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Product status
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: user firstName
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: User lastName
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: user email
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
 *                         $ref: '#/components/schemas/Leaderboard'
 *                       pagination:
 *                         $ref: '#/components/schemas/Pagination'
 */
