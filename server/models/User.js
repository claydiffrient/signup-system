module.exports = function(mongoose){
   var crypto = require('crypto');
   var Schema = mongoose.Schema;

   //Configure the User schema
   var User = new Schema({
      name: {type: String},
      email: {type: String},
      password: {type: String}
   });
}