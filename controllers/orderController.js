const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    totalAmount
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};
