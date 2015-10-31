const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const chalk = require('chalk');
const port = process.env.PORT || 3000;

require('dotenv').load();

const models = require('./models');
const routes = require('./routes');

const app = express();

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', routes);

if (app.get('env') === 'development')) {
  app.use(errorhandler());
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.static(path.join(__dirname, '../../')));
  app.use(express.static(path.join(__dirname, '../../tmp')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
  });
}

if (app.get('env') === 'production')) {
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

models
  .sequelize
  .sync()
  .then(() => {
    app.listen(port);
    chalk.bgGreen(`Server started on port: ${port}`);
  })
  .catch(() => {
    chalk.bgRed('App failed on sequelize error');
  });
