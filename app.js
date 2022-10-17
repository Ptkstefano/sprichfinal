var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var genericRouter = require('./routes/generic');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register')
var courseRouter = require('./routes/coursePage')
var locationRouter = require('./routes/location')
var methodologyRouter = require('./routes/methodology')
var logoutRouter = require('./routes/logout')
var enrollRouter = require('./routes/enroll')
var mycoursesRouter = require('./routes/mycourses')
var contactRouter = require('./routes/contact')


var app = express();

const oneDay = 1000 * 60 * 60 * 24;

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else next('route')
}

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes html <script> files correctly:
app.use(express.static('/public'));
app.use('/static', express.static(__dirname + '/public/assets'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/generic', genericRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/coursePage', courseRouter);
app.use('/methodology', methodologyRouter);
app.use('/location', locationRouter);
app.use('/logout', logoutRouter);
app.use('/enroll', enrollRouter);
app.use('/mycourses', mycoursesRouter);
app.use('/contact', contactRouter);

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
  res.render('error.html');
});

module.exports = app;
