'use strict';

const express = require('express');
const router = express.Router();
const utils = require('./lib/utils');
const UsersCtrl = require('./controllers/usersCtrl');

// auth
router.post('/auth/login', UsersCtrl.login);
router.post('/auth/signup', UsersCtrl.signup);

// authorization middleware
router.use(utils.isAuthenticated);

// users
router.get('/users', UsersCtrl.index);
router.get('/users/:id', UsersCtrl.show);
router.put('/users/:id', UsersCtrl.update);

module.exports = router;
