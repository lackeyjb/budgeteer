'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const models = require('../models');
const utils = require('../lib/utils');
const User = models.User;
const tokenSecret = process.env.TOKEN_SECRET;

module.exports = {

  signup(req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
    .then((user) => {
      res.status(201).json({
        token: utils.createJWT(user)
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },

  login(req, res) {
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
            token: utils.createJWT(user)
          });
        } else {
          return res.status(400).json({
            message: 'Wrong email and/or password'
          });
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },

  index(req, res) {
    User.all()
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
  },

  show(req, res) {
    User.findById(req.params.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
  },

  update(req, res) {
    User.update({
      email: req.body.email,
      username: req.body.username
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
  }

};
