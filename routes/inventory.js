const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const validation = require("../middleware/validation");

const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getAll);

router.get('/:id', inventoryController.getSingle);

router.post('/',validation.newInventory, inventoryController.createInventory);

router.put('/:id',validation.newInventory, inventoryController.updateInventory);

router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;