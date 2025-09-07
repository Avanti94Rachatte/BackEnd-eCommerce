const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');
const router = express.Router();

const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/cart',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  validateRequest,
  cartController.addToCart
);


router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/remove', protect, removeFromCart);

module.exports = router;
