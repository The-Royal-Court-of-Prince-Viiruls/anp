var db = require('../db/db');
var ObjectId = require('mongodb').ObjectID;

exports.add = function (req, res){
  var post = req.body;
  var collection = db.get().collection('posts');
  collection.insertOne(post,function(err, post) {
    res.json(post);
  });
};

exports.addQuestion = function (req, res) {

  var postToModify;

  var collection = db.get().collection('posts');

  collection.findOne({ '_id' :  new ObjectId(req.body.questionID) },function(err,postToModify){
  var questions = postToModify.questions;
  if(typeof questions === 'undefined')
    questions = [];
  questions.push({question: req.body.question,sender: req.body.sender, timestamp: req.body.timestamp});
  
  collection.update({ '_id' :  new ObjectId(req.body.questionID) },{$set : {'questions' : questions}},function(err,post){
    res.json(post);
  });
    });
}

exports.listByQuery = function(req, res) {
  var type = req.query.type;
  var category = req.query.category;
  var condition = req.query.condition;
  var location = req.query.location;
  var shipping = req.query.shipping;

  var collection = db.get().collection('posts');

  collection.find({ "type"     : {$in      : type},
  "category" : {$in      : category},
  "condition": {$in      : condition},
  "location" : {$in      : location},
  "shipping" : {$in      : shipping}}).toArray(function(err, posts) {
    res.json(posts);
  })
};

exports.listByUser = function(req, res) {
  var userId = req.params.id;
  userId = userId.substring(1);
  var collection = db.get().collection('posts');
  collection.find({"user" : userId}).toArray(function(err, posts) {
    res.json(posts);
  })
};

exports.listByType = function(req, res) {
  var tyyppi = req.params.type;
  tyyppi = tyyppi.substring(1);
  var collection = db.get().collection('posts');
  collection.find({"type" : tyyppi}).toArray(function(err, posts) {
    res.json(posts);
  })
};

exports.listByQueryTest = function(req, res) {
  var type      = req.query.type;
  console.log("type: " +type);
  var shipping  = req.query.shipping;
  console.log("shipping: "+shipping);
  var shipping  = JSON.parse(shipping);
  var condition = req.query.condition;
  console.log("condition: "+condition);

  var collection = db.get().collection('posts');

  collection.find({
                    "type"     : type,
                    "condition": {$in      : condition},
                    $or:[
             {$and: [ { "shipping.home": { $eq: shipping.home } }, { "shipping.home": { $eq: true } } ]},
             {$and: [ { "shipping.pickup": { $eq: shipping.pickup } }, { "shipping.pickup": { $eq: true } } ]},
             {$and: [ { "shipping.mail": { $eq: shipping.mail } }, { "shipping.mail": { $eq: true } } ]}]
                    }).toArray(function(err, posts) {
                  res.json(posts);
                })
              };

exports.listAll = function(req, res) {
  var collection = db.get().collection('posts');

  collection.find().toArray(function(err, posts) {
    res.json(posts);
  })
};
