// Haetaan framework
var express = require('express');
// database riippuvbuus
var db = require('./db/db')
// json parser
var bodyParser = require('body-parser');

var assert = require('assert');

// Mongolabin osoite
var url = process.env.MONGOLAB_URI;

// Path moduuli. Auttaa polkujen rakentelussa ja palastelussa
var path = require('path');

// kontrollerit
var index = require('./routes/index');
var posts = require('./routes/posts');

// Yhdistetään mongolabiin
db.connect(url, function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
});

// Käynnistetään framework.
var app = express();

// Annetaan polku viewsiin template enginelle
app.set('views', path.join(__dirname, 'views'));
// Käytetään jadea template enginenä näin aluksi
app.set('view engine', 'jade');
// polut staattisiin tiedostoihin template enginelle
app.use(express.static(path.join(__dirname, 'public')));
// json body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// liitetään kontrollerit
app.use('/', index);
app.post('/posts',posts.add);
app.get('/posts',posts.all);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
