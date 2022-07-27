const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.get('/', UserController.getAllUsers);
// router.post('/add', UserController.addUser);

module.exports = router;