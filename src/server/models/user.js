'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 20]
      }
    },
    username: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    classMethods: {
      comparePassword: (password, hash, callback) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
          if (err) {
            return callback(err, null);
          } else {
            callback(null, isMatch);
          }
        });
      },
      associate: (models) => {
        // example: User.hasMany(models.Task)
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
