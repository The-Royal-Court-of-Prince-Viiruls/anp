var express = require('express');
var router = express();
var Hello = mongoose.model('Hello');


router.post('/new',function (req, res, next) {
  var article = new Hello(req.body);
  article.save();
  res.json({message: 'Hello World!'});
});

router.get('/list',function (req, res, next) {
  var articles = Hello
  article.save();
  res.json({message: 'Hello World!'});
});

module.exports = router;
