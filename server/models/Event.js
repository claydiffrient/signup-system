module.exports = function(mongoose){
   var crypto = require('crypto');

   var Schema = mongoose.Schema;

   //Configure the Slot schema
   var SlotSchema = new Schema({
      name: {type: String},
      time: {type: Date},
      details: {
         email: {type: String},
         name: {type: String}
      }
   });

   //Configure the Event schema.
   var EventSchema = new Schema({
      slots: [SlotSchema],
      description: {type: String},
      owner: {type: Schema.Types.ObjectId, ref: 'User'}
   });

   var Event = mongoose.model('Event', EventSchema);

   var findByOwnerId = function (ownerId, callback) {
      Event.find({owner: ownerId}).exec(function (error, results) {
         if (error) throw error;
         callback(results);
      })
   }

   return {
      Event: Event,
      findByOwnerId: findByOwnerId
   }
}