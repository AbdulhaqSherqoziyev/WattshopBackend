// controllers/admins.js
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

exports.getAllAdmins = async (req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
};

exports.getAdmin = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  if (!admin) return res.status(404).json({ msg: 'Admin not found' });
  res.json(admin);
};

exports.createAdmin = [
  body('user_id').isInt().withMessage('User ID is required'),
  body('role').isIn(['superadmin', 'staff', 'deliveryman']).withMessage('Invalid role'),
  body('permissions').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const admin = await Admin.create(req.body);
      res.status(201).json(admin);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
];

exports.updateAdmin = [
  body('role').optional().isIn(['superadmin', 'staff', 'deliveryman']).withMessage('Invalid role'),
  body('permissions').optional(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    await admin.update(req.body);
    res.json(admin);
  },
];

exports.deleteAdmin = async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  if (!admin) return res.status(404).json({ msg: 'Admin not found' });
  await admin.destroy();
  res.json({ msg: 'Admin deleted' });
}