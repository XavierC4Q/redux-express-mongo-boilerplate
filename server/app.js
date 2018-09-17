const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const todos = require('./routes/todos');
const users = require('./routes/users');

const User = require('./models/users')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost:2525/db', { useNewUrlParser: true }).then(() => {
  console.log(`mongoose connected. server running`)
})

mongoose.globalPromise = Promise



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: `EH||FBV849B4\NJEHF/KHVHK2UOEQ\UH879553CHFJG`,
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




passport.use(new LocalStrategy(User.authenticate('local')));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('/todos', todos);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
