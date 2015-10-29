var express = require('express');
// Json parser
var bodyParser = require('body-parser');
// Path moduuli. Auttaa polkujen rakentelussa ja palastelussa
var path = require('path');
// Joudutaan ottamaan takapakkia polussa juureen
var root = path.join(__dirname, '..');

var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

require('./passport.js')(passport); // pass passport for configuration

module.exports = function (app) {
// Annetaan polku viewsiin template enginelle
app.set('views', path.join(root, 'views'));
// Käytetään jadea template enginenä näin aluksi
app.set('view engine', 'jade');
// polut staattisiin tiedostoihin template enginelle
app.use(express.static(path.join(root, 'public')));
app.use(cookieParser()); // read cookies (needed for auth)
// json body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));


// required for passport
app.use(session({ secret: 'ilovesandels', resave: false, saveUninitialized: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes')(app, passport);
};
