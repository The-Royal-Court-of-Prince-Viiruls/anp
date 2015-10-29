// kontrollerit
var index = require('../routes/index');
var posts = require('../routes/posts');
var users = require('../routes/users');

module.exports = function (app) {
  // liitetään kontrollerit
  app.use('/', index);

  app.post('/posts',posts.add);
  app.get('/posts',posts.listAll);
  app.get('/posts/query',posts.listByQuery);
  app.get('/posts/query/test',posts.listByQueryTest);
  app.get('/posts/:type',posts.listByType);

  app.post('/users',users.add);
  app.get('/users',users.listAll);
  app.get('/users/:username',users.findByUsername);
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
