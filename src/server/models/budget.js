'use strict';

module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('budget', {

  }, {
    classMethods: {
      associate(models) {
        Budget.hasMany(models.expense);
      }
    }
  });

  return Budget;
};
