// kontrollerit
var index = require('../routes/index');
var posts = require('../routes/posts');

module.exports = function (app,passport) {
  // liitetään kontrollerit
  app.use('/', index);

  app.post('/posts', isLoggedIn, posts.add);
  app.post('/posts/addquestion', isLoggedIn, posts.addQuestion);
  app.get('/posts',posts.listAll);
  app.get('/posts/query',posts.listByQuery);
  app.get('/posts/:type',posts.listByType);
  app.get('/posts/user/:id',isLoggedIn, posts.listByUser);
  app.post('/posts/delete/:id', isLoggedIn, posts.removePost);

  app.get('/sessioninfo', isLoggedIn, function(req,res){
    res.json({id: req.user._id, email: req.user.local.email});
  });

  app.get('/signupsuccess',function(req,res){
    res.json({path: "/"});
  });

  app.get('/signupfail',function(req,res){
    res.json({path:"/signup",message: req.flash('signupMessage')});
  });

  app.get('/loginsuccess',function(req,res){
    res.json({path: "/"});
  });

  app.get('/loginfail',function(req,res){
    res.json({path:"/login",message: req.flash('loginMessage')});
  });
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/signupsuccess', // redirect to the secure profile section
    failureRedirect : '/signupfail', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/loginsuccess', // redirect to the secure profile section
    failureRedirect : '/loginfail', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/logout', function(req,res){
    req.logout();
    res.json(req.isAuthenticated() ? true : false);
  });

  // route to test if the user is logged in or not
  app.get('/loggedin', function(req, res) {
     res.json(req.isAuthenticated() ? true : false);
   });

  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
    return next();
  }
    // if they aren't redirect them TODO
    res.json({});
  }

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
}
