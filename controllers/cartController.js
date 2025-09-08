import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

//  add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

    // find or create cart for user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // check if product exists in DB
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // if item exists in cart, update qty else push
    const existing = cart.items.find(it => it.product.toString() === productId.toString());
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({ success: true, message: 'Added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get cart items
export const getCart = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId query required' });

    const cart = await Cart.findOne({ userId }).populate('items.product');
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
