const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const validation = require("../middleware/validation");

const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getSingle);

router.post('/',validation.newTask, tasksController.createTask);

router.put('/:id',validation.newTask, tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;