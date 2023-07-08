const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getUsers)

router.get('/users', usersController.getUsers);

router.get('/:id', usersController.getSingle);

router.post('/users', usersController.postUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser); 

module.exports = router;