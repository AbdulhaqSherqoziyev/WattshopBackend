// controllers/carts.js
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getMyCart = async (req, res) => {
  let cart = await Cart.findOne({ where: { user_id: req.user.id }, include: [{ model: CartItem, include: Product }] });
  if (!cart) {
    cart = await Cart.create({ user_id: req.user.id });
  }
  res.json(cart);
};

exports.addToCart = [
  body('product_id').isInt().withMessage('Product ID is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Valid quantity required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id });
    }
    const { product_id, quantity = 1 } = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    let item = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ cart_id: cart.id, product_id, quantity });
    }
    res.json(item);
  },
];

exports.updateCartItem = [
  body('quantity').isInt({ min: 1 }).withMessage('Valid quantity required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const item = await CartItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Cart item not found' });
    await item.update(req.body);
    res.json(item);
  },
];

exports.removeFromCart = async (req, res) => {
  const item = await CartItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ msg: 'Cart item not found' });
  await item.destroy();
  res.json({ msg: 'Item removed' });
};