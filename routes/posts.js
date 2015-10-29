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

exports.listByType = function(req, res) {
  var tyyppi = req.params.type;
  tyyppi = tyyppi.substring(1);
  var collection = db.get().collection('posts');
  collection.find({"data.type" : tyyppi}).toArray(function(err, posts) {
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
                    "data.type"     : type,
                    "data.condition": {$in      : condition},
                    $or:[
             {$and: [ { "data.shipping.home": { $eq: shipping.home } }, { "data.shipping.home": { $eq: true } } ]},
             {$and: [ { "data.shipping.pickup": { $eq: shipping.pickup } }, { "data.shipping.pickup": { $eq: true } } ]},
             {$and: [ { "data.shipping.mail": { $eq: shipping.mail } }, { "data.shipping.mail": { $eq: true } } ]}]
                    }).toArray(function(err, posts) {
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
