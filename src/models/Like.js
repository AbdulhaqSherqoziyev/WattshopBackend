// models/Like.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'likes',
});

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(Like, { foreignKey: 'product_id' });
Like.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Like;