// controllers/orders.js
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const sequelize = require('../config/db');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll({ include: OrderItem });
  res.json(orders);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.findAll({ where: { user_id: req.user.id }, include: OrderItem });
  res.json(orders);
};

exports.createOrder = [
  body('delivery_type').isIn(['tashkent', 'other']).withMessage('Invalid delivery type'),
  body('delivery_address').notEmpty().withMessage('Delivery address required'),
  body('comment').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const transaction = await sequelize.transaction();
    try {
      const cart = await Cart.findOne({ where: { user_id: req.user.id }, include: CartItem, transaction });
      if (!cart || cart.CartItems.length === 0) return res.status(400).json({ msg: 'Cart is empty' });
      let total_price = 0;
      for (const item of cart.CartItems) {
        const product = await Product.findByPk(item.product_id, { transaction });
        total_price += product.price * item.quantity;
      }
      const order = await Order.create({
        user_id: req.user.id,
        total_price,
        delivery_type: req.body.delivery_type,
        delivery_address: req.body.delivery_address,
        comment: req.body.comment,
      }, { transaction });
      for (const item of cart.CartItems) {
        await OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: (await Product.findByPk(item.product_id, { transaction })).price,
        }, { transaction });
      }
      await CartItem.destroy({ where: { cart_id: cart.id }, transaction });
      await transaction.commit();
      res.status(201).json(order);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateOrder = [
  body('status').optional().isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  body('payment_status').optional().isIn(['pending', 'paid']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    await order.update(req.body);
    res.json(order);
  },
];

exports.deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ msg: 'Order not found' });
  await order.destroy();
  res.json({ msg: 'Order deleted' });
};