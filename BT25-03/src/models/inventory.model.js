const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const Inventory = sequelize.define('Inventory', {
  stock: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
  reserved: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
  soldCount: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } }
});

// Thiết lập Quan hệ 1-1
Product.hasOne(Inventory, { foreignKey: 'productId' });
Inventory.belongsTo(Product, { foreignKey: 'productId' });

// HOOK: Tự động tạo bản ghi kho khi tạo sản phẩm
Product.afterCreate(async (product) => {
  await Inventory.create({ productId: product.id });
});

module.exports = Inventory;