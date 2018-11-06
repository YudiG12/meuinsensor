var express = require('express');
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session');
var cookieParser = require('cookie-parser');

require('./controllers/authController')(passport);

var indexRouter = require('./controllers/indexController');
// var usersRouter = require('./controllers/usersRouter');
var incubadorasRouter = require('./controllers/incubadorasController');

const app = express();

// PASSPORT SETUP
app.use(session({
    secret: '123',//configure um segredo seu aqui
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// VIEW ENGINE SETUP
app.set('views','./views');
app.set('view engine','ejs');

// EXPRESS SETUP
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/', indexRouter);
// app.use('/users',usersRouter);
app.use('/incubadoras',incubadorasRouter);

module.exports = app;
