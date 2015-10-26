var express = require('express');
// Json parser
var bodyParser = require('body-parser');
// Path moduuli. Auttaa polkujen rakentelussa ja palastelussa
var path = require('path');
// Joudutaan ottamaan takapakkia polussa juureen
var root = path.join(__dirname, '..');

module.exports = function (app) {
// Annetaan polku viewsiin template enginelle
app.set('views', path.join(root, 'views'));
// Käytetään jadea template enginenä näin aluksi
app.set('view engine', 'jade');
// polut staattisiin tiedostoihin template enginelle
app.use(express.static(path.join(root, 'public')));
// json body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
};
