// controllers/deliveries.js
const { body, validationResult } = require('express-validator');
const Delivery = require('../models/Delivery');

exports.getAllDeliveries = async (req, res) => {
  const deliveries = await Delivery.findAll();
  res.json(deliveries);
};

exports.getDelivery = async (req, res) => {
  const delivery = await Delivery.findByPk(req.params.id);
  if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });
  res.json(delivery);
};

exports.createDelivery = [
  body('order_id').isInt().withMessage('Order ID is required'),
  body('delivery_status').optional().isIn(['pending', 'on_the_way', 'delivered']),
  body('vehicle_number').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const delivery = await Delivery.create(req.body);
      res.status(201).json(delivery);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateDelivery = [
  body('delivery_status').optional().isIn(['pending', 'on_the_way', 'delivered']),
  body('vehicle_number').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });
    await delivery.update(req.body);
    res.json(delivery);
  },
];

exports.deleteDelivery = async (req, res) => {
  const delivery = await Delivery.findByPk(req.params.id);
  if (!delivery) return res.status(404).json({ msg: 'Delivery not found' });
  await delivery.destroy();
  res.json({ msg: 'Delivery deleted' });
};