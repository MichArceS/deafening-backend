
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth')
var attendanceRouter = require('./routes/attendance');
var packRouter = require('./routes/pack');
var packRegisterRouter = require('./routes/packRegister');
var paymentRouter = require('./routes/payment');
var representativeRouter = require('./routes/representative');
var scheduleRouter = require('./routes/schedule');
var studentRouter = require('./routes/student');
var styleRouter = require('./routes/style');
var teacherRouter = require('./routes/teacher');
var teacherStyleRouter = require('./routes/teacherStyle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//create a cors middleware
app.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth', authRouter);
app.use('/attendance', attendanceRouter);
app.use('/pack', packRouter);
app.use('/packRegister', packRegisterRouter);
app.use('/payment', paymentRouter);
app.use('/representative', representativeRouter);
app.use('/schedule', scheduleRouter);
app.use('/student', studentRouter);
app.use('/style', styleRouter);
app.use('/teacher', teacherRouter);
app.use('/teacherStyle', teacherStyleRouter);

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
