const express = require('express');
const router = express.Router();
// Đảm bảo file controller cũng đã tồn tại nhé!
const inventoryCtrl = require('../controllers/inventory.controller');

// 1. Get all inventories
router.get('/inventory', inventoryCtrl.getAll);

// 2. Get by ID
router.get('/inventory/:id', inventoryCtrl.getById);

// 3. Add stock
router.post('/inventory/add', inventoryCtrl.addStock);

// 4. Reserve stock (Stock -> Reserved)
router.post('/inventory/reserve', inventoryCtrl.reserve);

// 5. Confirm sold (Reserved -> SoldCount)
router.post('/inventory/sold', inventoryCtrl.sold);

module.exports = router;