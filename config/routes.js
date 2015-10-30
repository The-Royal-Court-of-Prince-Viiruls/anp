// kontrollerit
var index = require('../routes/index');
var posts = require('../routes/posts');

module.exports = function (app,passport) {
  // liitetään kontrollerit
  app.use('/', index);

  app.post('/posts',posts.add);
  app.get('/posts',posts.listAll);
  app.get('/posts/query',posts.listByQuery);
  app.get('/posts/query/test',posts.listByQueryTest);
  app.get('/posts/:type',posts.listByType);

  app.get('/success',function(req,res){
    res.json({path: "/"});
  });
  app.get('/failure',function(req,res){
    res.json({path: "/signup"});
  });
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/success', // redirect to the secure profile section
    failureRedirect : '/failure', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

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
