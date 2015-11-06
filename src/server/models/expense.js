'use strict';

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('expense', {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      required: true
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'uncategorized'
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'no description'
    }
  });

  return Expense;
};
