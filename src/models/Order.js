// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: DataTypes.INTEGER,
  total_price: DataTypes.DECIMAL(10, 2),
  payment_status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  delivery_type: DataTypes.STRING,
  delivery_address: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  comment: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'orders',
});

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Order;