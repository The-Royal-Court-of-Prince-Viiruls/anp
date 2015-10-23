// Kaynnistetaan MongoDB driveri
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// luodaan hello skeema
var HelloSchema = new Schema({
  message: {type : String, default : ''}
})

exports.hello = settings.mongoose.model('hello', HelloSchema)
