// config/db.js - Database configuration
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('watshop', 'postgres', 'umidjon06', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;