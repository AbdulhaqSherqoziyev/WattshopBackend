// models/OrderItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: DataTypes.DECIMAL(10, 2),
}, {
  timestamps: false,
  tableName: 'order_items',
});

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = OrderItem;