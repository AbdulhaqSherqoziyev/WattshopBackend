// models/Setting.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING,
    unique: true,
  },
  value: DataTypes.TEXT,
}, {
  timestamps: false,
  tableName: 'settings',
});

module.exports = Setting;
