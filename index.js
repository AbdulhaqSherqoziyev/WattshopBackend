// app.js (or index.js) - Entry point of the application
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const productImageRoutes = require('./routes/product_images');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');
const deliveryRoutes = require('./routes/deliveries');
const notificationRoutes = require('./routes/notifications');
const likeRoutes = require('./routes/likes');
const reviewRoutes = require('./routes/reviews');
const settingRoutes = require('./routes/settings');

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-images', productImageRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error('Database sync error:', err));