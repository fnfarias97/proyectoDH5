var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
var session = require ('express-session');
var {remember} = require ('./middlewares/authMiddleware');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var productsRouter = require('./routes/products');
var apiAuthRouter = require('./routes/api/apiAuth');
var apiProductsRouter = require('./routes/api/apiProducts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret:"algo"}));

app.use(remember);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/api/users', apiAuthRouter);
app.use('/api/products', apiProductsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
