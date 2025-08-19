// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  color: DataTypes.STRING,
  description: DataTypes.TEXT,
  category_id: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(10, 2),
  quantity: DataTypes.INTEGER,
  warranty_months: DataTypes.INTEGER,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'products',
});

Product.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Product, { foreignKey: 'category_id' });

module.exports = Product;