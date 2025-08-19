// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  parent_id: DataTypes.INTEGER,
}, {
  timestamps: false,
  tableName: 'categories',
});

Category.hasMany(Category, { as: 'Children', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'Parent', foreignKey: 'parent_id' });

module.exports = Category;