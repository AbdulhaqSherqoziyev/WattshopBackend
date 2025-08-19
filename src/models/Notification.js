// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  message: DataTypes.TEXT,
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'notifications',
});

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Notification;