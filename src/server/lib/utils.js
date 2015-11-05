'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const tokenSecret = process.env.TOKEN_SECRET;

module.exports = {

  isAuthenticated(req, res, next) {
    let token, payload;

    if (!req.headers.authorization) {
      return res.status(401).json({
        message: 'Please make sure your request has an authorization header'
      });
    }

    token = req.headers.authorization.split(' ')[1];
    payload = null;

    try {
      payload = jwt.decode(token, tokenSecret);
    }
    catch (err) {
      res.status(401).json({
        message: err.message
      });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        message: 'Token has expired'
      });
    }

    req.user = payload.sub;
    next();
  }

};
