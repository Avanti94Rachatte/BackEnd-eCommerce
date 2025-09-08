import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import { addToFavorites, getFavorites } from '../controllers/favoriteController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorites management
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add to favorites
 *     tags: [Favorites]
 */
router.post('/', [
  body('userId').notEmpty(),
  body('productId').notEmpty()
], validateRequest, addToFavorites);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get favorites
 *     tags: [Favorites]
 */
router.get('/', getFavorites);

export default router;
