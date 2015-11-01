'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};
let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize('budgeteer', process.env.DB_USER, '', {
    dialect: 'postgres',
    port: '5432',
    host: 'localhost'
  });
}

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: true
    }
  });
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
