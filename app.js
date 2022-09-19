var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
const session = require('express-session');
const database = require("./controllers/database");
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var songsrouter = require('./routes/songs');
var adminrouter = require('./routes/admin');
var moviesrouter = require('./routes/movies');

var port = (process.env.PORT || '3000');
var app = express();
database.connect();
app.listen(port, (err) => {
  if (err)
    throw err
  console.log("App Started!")
})
app.use(session({ secret: 'keyboard cat', cookie: {}, resave: false, saveUninitialized: true, }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/song', songsrouter);
app.use('/admin', adminrouter);
app.use('/movies', moviesrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
