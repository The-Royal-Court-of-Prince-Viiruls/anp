var db = require('../db/db');

exports.add = function (req, res){
  var post = req.body;
  var collection = db.get().collection('users');
  collection.insertOne(post,function(err, user) {
    res.json(user);
  })
};

exports.listAll = function (req, res){
  var collection = db.get().collection('users');
  collection.find().toArray(function(err, users) {
    res.json(users);
  })
};

exports.findByUsername = function (req, res){
  var username = req.params.username;
  var collection = db.get().collection('users');
  collection.findOne({"username" : username}, function(err, user) {
        res.json(user);
      });
};

exports.removeById = function(req, res) {
  var id = req.params.id;
  var collection = db.get().collection('users');
  collection.findAndRemove({"_id": id});
};
