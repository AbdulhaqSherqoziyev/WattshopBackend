// app.js (or index.js) - Entry point of the application
const express = require('express');
const sequelize = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const adminRoutes = require('./src/routes/admins');
const categoryRoutes = require('./src/routes/categories');
const productRoutes = require('./src/routes/products');
const productImageRoutes = require('./src/routes/product_images');
const cartRoutes = require('./src/routes/carts');
const orderRoutes = require('./src/routes/orders');
const deliveryRoutes = require('./src/routes/deliveries');
const notificationRoutes = require('./src/routes/notifications');
const likeRoutes = require('./src/routes/likes');
const reviewRoutes = require('./src/routes/reviews');
const settingRoutes = require('./src/routes/settings');
const setupSwagger = require("./swagger"); 

const app = express();
app.use(express.json());
setupSwagger(app);


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







sequelize.authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database connection failed:', err));


// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error('Database sync error:', err));