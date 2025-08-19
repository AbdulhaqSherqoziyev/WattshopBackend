// config/db.js - Database configuration
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_db_name', 'your_db_user', 'your_db_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;