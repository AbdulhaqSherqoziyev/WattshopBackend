// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  rating: DataTypes.INTEGER,
  comment: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'reviews',
});

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Review;