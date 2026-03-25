const Inventory = require('../models/inventory.model');
const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  const data = await Inventory.findAll({ include: Product });
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Inventory.findByPk(req.params.id, { include: Product });
  res.json(data);
};

// Add stock
exports.addStock = async (req, res) => {
  const { productId, quantity } = req.body;
  const inv = await Inventory.findOne({ where: { productId } });
  await inv.increment('stock', { by: quantity });
  res.json({ message: "Stock updated", data: await inv.reload() });
};

// Reservation (Stock -> Reserved)
exports.reserve = async (req, res) => {
  const { productId, quantity } = req.body;
  const inv = await Inventory.findOne({ where: { productId } });

  if (inv.stock < quantity) return res.status(400).json({ error: "Out of stock" });
  
  await inv.update({
    stock: inv.stock - quantity,
    reserved: inv.reserved + quantity
  });
  res.json(inv);
};

// Sold (Reserved -> SoldCount)
exports.sold = async (req, res) => {
  const { productId, quantity } = req.body;
  const inv = await Inventory.findOne({ where: { productId } });

  if (inv.reserved < quantity) return res.status(400).json({ error: "Insufficient reserved stock" });

  await inv.update({
    reserved: inv.reserved - quantity,
    soldCount: inv.soldCount + quantity
  });
  res.json(inv);
};