// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  role: DataTypes.STRING,
  permissions: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'admins',
});

User.hasOne(Admin, { foreignKey: 'user_id' });
Admin.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Admin;