'use strict';

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    name: {
      type: DataTypes.STRING,
      required: true
    },
    limit: {
      type: DataTypes.DECIMAL(10, 2),
      required: true
    },
    recurrence: {
      type: DataTypes.ENUM,
      values: ['weekly', 'monthly'],
      defaultValue: 'monthly'
    }
  }, {
    classMethods: {
      associate(models) {
        Group.hasMany(models.user);
        Group.hasMany(models.budget);
      }
    }
  });

  return Group;
};
