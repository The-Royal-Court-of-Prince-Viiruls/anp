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

exports.listByQuery = function(req, res) {
  var type      = req.query.type;
  var shipping  = JSON.parse(req.query.shipping);
  var condition = req.query.condition;
  var category = req.query.category;
  var location = req.query.location;

  if (typeof location === 'undefined')
    location = {};

  if (typeof category === 'undefined')
    category = {};

  console.log("type: "+type);
  console.log("shipping: "+shipping);
  console.log("condition: "+condition);
  console.log("category: "+category);
  console.log("location: "+location);

  var collection = db.get().collection('posts');

  collection.find({
                    "type"     : type,
                    "category" : {$in      : category},
                    "condition": {$in      : condition},
                    "location" : {$in      : location},
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
