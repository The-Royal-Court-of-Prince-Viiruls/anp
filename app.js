//Haetaan framework
var express = require('express');

//path moduuli. Auttaa polkujen rakentelussa ja palastelussa
var path = require('path');

//kontrollerit
var index = require('./routes/index');

//Käynnistetään framework.
var app = express();

// Annetaan polku viewsiin template enginelle
app.set('views', path.join(__dirname, 'views'));
// Käytetään jadea template enginenä näin aluksi
app.set('view engine', 'jade');
//polut staattisiin tiedostoihin template enginelle
app.use(express.static(path.join(__dirname, 'public')));


//liitetään kontrollerit
app.use('/', index);

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
