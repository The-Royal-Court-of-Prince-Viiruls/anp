// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var ObjectId = require('mongodb').ObjectID;
// load the things we need
var bcrypt   = require('bcrypt-nodejs');
var db = require('../db/db');
// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    var collection = db.get().collection('users');
    collection.findOne({ '_id' :  new ObjectId(id) }, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    process.nextTick(function() {
      var collection = db.get().collection('users');
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      collection.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

          // if there is no user with that email
          // create the user

          var newuser = {
            local : {
              name: req.body.name,
              email: email,
              password: generateHash(password)
            }
          }

          // save the user
          collection.insertOne(newuser,function(err) {
            if (err)
            throw err;
          });

          collection.findOne({ 'local.email' :  email }, function(err, user) {
            return done(null,user);
          })
        }

      });

    });

  }));

passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
  var collection = db.get().collection('users');
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  collection.findOne({ 'local.email' :  email }, function(err, user) {
    // if there are any errors, return the error
    if (err)
    return done(err);

    // if no user is found, return the message
    if (!user)
    return done(null, false, req.flash('loginMessage', 'Käyttäjätunnusta ei ole olemassa.'));

    // if the user is found but the password is wrong
    if (!validPassword(user,password))
    return done(null, false, req.flash('loginMessage', 'Väärä salasana.')); // create the loginMessage and save it to session as flashdata

    // all is well, return successful user
    return done(null, user);

  });

}));



// generating a hash
generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
validPassword = function(user,password) {
  return bcrypt.compareSync(password, user.local.password);
};

};
