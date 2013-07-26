module.exports = function(mongoose){
   var crypto = require('crypto');

   var Schema = mongoose.Schema;

   //Configure the Slot schema
   var Slot = new Schema({
      name: {type: String},
      time: {type: Date},
      details: {
         email: {type: String},
         name: {type: String}
      }
   });

   //Configure the Event schema.
   var Event = new Schema({
      slots: [Slot],
      description: {type: String},
      owner: {type: Schema.Types.ObjectId, ref: 'User'}
   });
}