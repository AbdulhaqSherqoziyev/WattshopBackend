// models/ProductImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: DataTypes.INTEGER,
  image_url: DataTypes.STRING,
}, {
  timestamps: false,
  tableName: 'product_images',
});

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;