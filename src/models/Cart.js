// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: DataTypes.INTEGER,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'carts',
});

User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Cart;