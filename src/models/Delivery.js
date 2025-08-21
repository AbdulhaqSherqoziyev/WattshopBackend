// models/Delivery.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  delivery_status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  vehicle_number: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'deliveries',
});

Order.hasOne(Delivery, { foreignKey: 'order_id' });
Delivery.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Delivery;
