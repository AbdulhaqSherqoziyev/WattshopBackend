    // models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cart = require('./Cart');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cart_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: false,
  tableName: 'cart_items',
});

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = CartItem;