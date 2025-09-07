const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add item to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item added to favorites
 *       400:
 *         description: Invalid input
 */

router.post(
    '/favorites',
    [
      body('productId').notEmpty().withMessage('Product ID is required')
    ],
    validateRequest,
    wishlistController.addToFavorites
  );

  
router.get('/', protect, getWishlist);
router.post('/add', protect, addToWishlist);
router.post('/remove', protect, removeFromWishlist);

module.exports = router;
