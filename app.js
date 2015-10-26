// Haetaan framework
var express = require('express');
// database riippuvbuus
var db = require('./db/db');
var assert = require('assert');

// Mongolabin osoite
var mongolab_uri = process.env.MONGOLAB_URI;
// Yhdistetään mongolabiin
db.connect(mongolab_uri, function(err) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
});

// Käynnistetään framework.
var app = express();

// Haetaan expressin asetukset
require('./config/express')(app);

// Haetaan kontrollerit tietokantaan
require('./config/routes')(app);

module.exports = app;
