const express = require('express');
const sequelize = require('./config/database');
const inventoryRoutes = require('./routes/inventory.routes');
const Product = require('./models/product.model');
const Inventory = require('./models/inventory.model');

const app = express();
app.use(express.json());

// Sử dụng Routes
app.use('/api', inventoryRoutes);

// Đồng bộ Database và Khởi chạy Server
const startServer = async () => {
  try {
    // force: false để không xóa dữ liệu cũ mỗi khi restart
    await sequelize.sync({ force: false });
    console.log('✅ Database & Tables đã được đồng bộ trên pgAdmin!');

    const PORT = process.env.SERVER_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Không thể kết nối Database:', error);
  }
};

startServer();