import express from 'express';
import { getAllProducts, getProductsByCategory, addProduct } from '../controllers/productController.js';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Array of products
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category name
 *     responses:
 *       200:
 *         description: Array of products in category
 */
router.get('/:category', getProductsByCategory);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a product (for testing/admin)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', [
  body('name').notEmpty(),
  body('price').isNumeric(),
  body('category').notEmpty()
], validateRequest, addProduct);

export default router;
