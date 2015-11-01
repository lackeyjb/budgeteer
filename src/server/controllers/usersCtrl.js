'use strict';

const jwt = require('jwt-simple');
const chalk = require('chalk');
const moment = require('moment');
const models = require('../models');
const User = models.User;
const tokenSecret = process.env.TOKEN_SECRET;

module.exports = {

  signup: function (req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
    .then((user) => {
      res.status(201).json({
        token: createJWT(user)
      });
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
  },

  login: function (req, res) {
    User.find({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      User.comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(401).json({
            message: err
          });
        }
        if (isMatch) {
          return res.status(200).json({
            token: createJWT(user)
          });
        } else {
          return res.status(400).json({
            message: 'Wrong email and/or password'
          });
        }
      });
    })
    .catch((err) => {
      console.error(chalk.red(err));
    });
  }
};

///////////////////////
///////////////////////

function createJWT(user) {
  const payload = {
    sub: User.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, tokenSecret);
}
