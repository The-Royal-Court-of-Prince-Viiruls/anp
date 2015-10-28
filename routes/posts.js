var db = require('../db/db');

exports.add = function (req, res){
  var post = req.body;
  var collection = db.get().collection('posts');
  collection.insertOne(post,function(err, post) {
    res.json(post);
  });
};

exports.listByQuery = function(req, res) {
  var type = req.query.type;
  var category = req.query.category;
  var condition = req.query.condition;
  var location = req.query.location;
  var shipping = req.query.shipping;

  var collection = db.get().collection('posts');

  collection.find({ "data.type"     : {$in      : type},
                    "data.category" : {$in      : category},
                    "data.condition": {$in      : condition},
                    "data.location" : {$in      : location},
                    "data.shipping" : {$in      : shipping}}).toArray(function(err, posts) {
    res.json(posts);
  })
};

exports.listByQueryTest = function(req, res) {
  console.log(req.query.type);
  var type = req.query.type;

  var collection = db.get().collection('posts');

  collection.find({ "data.type"     : {$in      : type}}).toArray(function(err, posts) {
    res.json(posts);
  })
};


exports.listByUser = function(req,res) {
  var username = req.params.username;
  var collection = db.get().collection('posts');
  collection.find({"data.user" : username}).toArray(function(err, posts) {
    res.json(posts);
  })

}

exports.listAll = function(req, res) {
  var collection = db.get().collection('posts');

  collection.find().toArray(function(err, posts) {
    res.json(posts);
  })
};

exports.removeById = function(req, res) {
  var id = req.params.id;
  var collection = db.get().collection('posts');

  collection.findAndRemove({"_id": id});
};
