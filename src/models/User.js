// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING, // Added for authentication
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  location: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'users',
});

module.exports = User;