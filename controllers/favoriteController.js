import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';

export const addToFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // prevent duplicates
    const exists = await Favorite.findOne({ userId, product: productId });
    if (exists) return res.status(200).json({ success: true, message: 'Already in favorites' });

    const fav = new Favorite({ userId, product: productId });
    await fav.save();
    res.status(201).json({ success: true, message: 'Added to favorites', fav });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId query required' });

    const favs = await Favorite.find({ userId }).populate('product');
    res.json(favs.map(f => f.product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
