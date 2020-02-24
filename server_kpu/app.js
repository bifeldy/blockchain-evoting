const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');

// main application
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// router controller
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const electionRouter = require('./routes/election');

// connecting to node
const eth = require('./helpers/eth');
eth.gethInitWeb3();

const db = require('./helpers/db');
db.mySqlQuery(`SELECT * FROM contracts`, null, (error, results) => {
  if (error) next(createError(500));
  else if (results.length > 0) {
    const idx = results.findIndex(r => r.active == 1);
    if (idx >= 0) {
      const abi = JSON.parse(results[idx].abi);
      const address = results[idx].address;
      eth.web3NewContractInstance(abi, address, idx);
    }
    else eth.web3DeployContract();
  }
  else eth.web3DeployContract();
});

// routing
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/user', usersRouter);
app.use('/api/election', electionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    info: `😫 ${err.status || 500} - Whoops, Terjadi Kesalahan! 💩`,
    result: err
  });
});

module.exports = app;
