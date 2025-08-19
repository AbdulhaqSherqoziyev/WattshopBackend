// controllers/settings.js
const { body, validationResult } = require('express-validator');
const Setting = require('../models/Setting');

exports.getAllSettings = async (req, res) => {
  const settings = await Setting.findAll();
  res.json(settings);
};

exports.getSetting = async (req, res) => {
  const setting = await Setting.findByPk(req.params.id);
  if (!setting) return res.status(404).json({ msg: 'Setting not found' });
  res.json(setting);
};

exports.createSetting = [
  body('key').notEmpty().withMessage('Key is required'),
  body('value').notEmpty().withMessage('Value is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const setting = await Setting.create(req.body);
      res.status(201).json(setting);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ msg: 'Key already exists' });
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateSetting = [
  body('value').notEmpty().withMessage('Value is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const setting = await Setting.findByPk(req.params.id);
    if (!setting) return res.status(404).json({ msg: 'Setting not found' });
    await setting.update(req.body);
    res.json(setting);
  },
];

exports.deleteSetting = async (req, res) => {
  const setting = await Setting.findByPk(req.params.id);
  if (!setting) return res.status(404).json({ msg: 'Setting not found' });
  await setting.destroy();
  res.json({ msg: 'Setting deleted' });
};