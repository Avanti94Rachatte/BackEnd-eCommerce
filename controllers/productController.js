import Product from '../models/Product.js';

// get products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get products by category 
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add products 
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'name, price and category are required' });
    }
    const p = new Product({ name, description, price, category, image });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
