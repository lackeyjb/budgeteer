'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [4, 20]
      }
    },
    username: {
      type: DataTypes.STRING
    },
    budgetAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    instanceMethods: {
      toJSON() {
        const values = this.get();

        delete values.password;
        return values;
      }
    },
    classMethods: {
      comparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, (err, isMatch) => {
          if (err) {
            return callback(err, null);
          } else {
            callback(null, isMatch);
          }
        });
      }
    }
  });

  User.hook('beforeCreate', (user, options, callback) => {
    const SALT_WORK_FACTOR = 10;
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        return callback(err, null);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return callback(err, null);
        }
        user.password = hash;
        return callback(null, user);
      });
    });
  });

  return User;
};
