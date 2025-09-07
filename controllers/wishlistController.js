const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) wishlist = new Wishlist({ user: req.user._id, products: [] });
  if (!wishlist.products.includes(productId)) wishlist.products.push(productId);

  await wishlist.save();
  res.json(wishlist);
};

exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
  res.json(wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
  await wishlist.save();
  res.json(wishlist);
};
