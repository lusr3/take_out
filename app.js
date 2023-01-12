var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var userRouter = require('./routes/user')
var cusRouter = require('./routes/customer')
var venRouter = require('./routes/vendor')
var ridRouter = require('./routes/rider')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 10 * 60 * 60 * 1000}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log(req.url)
    if (req.url != '/user/login' && req.url != '/user/register?' && req.url != '/user/register' && req.session.username === undefined) {
        res.redirect('/user/login');
        return;
    }
    res.locals.username = req.session.username;
    next();
});

// 主要路由
app.use('/user', userRouter);
app.use('/customer', cusRouter);
app.use('/vendor', venRouter);
app.use('/rider', ridRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404');
    return;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
    console.log('Server is running on http://localhost:' + app.get('port') + '.\n');
});


module.exports = app;
