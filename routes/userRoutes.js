const express = require('express');
const { userController } = require('../controllers');

const userRoutes = express.Router();

userRoutes.post('/users', userController.addUser);

module.exports = userRoutes;
