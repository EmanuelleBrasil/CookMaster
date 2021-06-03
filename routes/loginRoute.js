const express = require('express');
const { loginController } = require('../controllers');

const loginRoute = express.Router();

loginRoute.post('/login', loginController.userLogin);

module.exports = loginRoute;
