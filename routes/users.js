const express = require('express');
const router = express.Router();
const validation = require("../middleware/validation");
const auth = require("../middleware/auth")

const usersController = require('../controllers/users');

router.get('/', usersController.getUsers)

// router.get('/users', usersController.getUsers);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.postUser);

router.put('/:id',validation.newUserInfo, usersController.updateUser);

router.delete('/:id', usersController.deleteUser); 

module.exports = router;