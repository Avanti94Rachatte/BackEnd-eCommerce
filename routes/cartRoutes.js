import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import { addToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added
 */
router.post('/', [
  body('userId').notEmpty(),
  body('productId').notEmpty(),
  body('quantity').optional().isInt({ min: 1 })
], validateRequest, addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Cart items
 */
router.get('/', getCart);

export default router;
