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
      name: {type: String},
      owner: {type: Schema.Types.ObjectId, ref: 'User'}
   });

   var Event = mongoose.model('Event', EventSchema);
   var Slot = mongoose.model('Slot', SlotSchema);

   var findByOwnerId = function (ownerId, callback) {
      Event.find({owner: ownerId}).exec(function (error, results) {
         if (error) throw error;
         callback(results);
      })
   }

   var findById = function (eventId, callback) {
      Event.findOne({_id:eventId}, function (error, event) {
         if (error) throw error;
         if (!event) callback(false);
         else callback(event);
      });
   }

   var createEvent = function (eventDetails, callback) {
      var that = this;
      var eventId = false;
      var event = new Event(eventDetails);
      event.save(function (error, event) {
         if (error) {
            callback(false);
         }
         callback(event._id);
      });
   }

   var deleteEvent = function (event) {
      Event.findOne({_id:event._id}, function (error, event) {
         if (error) throw error;
         event.remove();
      })
   }

   var addSlot = function (eventId, slotDetails) {
      findById(eventId, function (event) {
         if (!event) return;
         event.slots.push(new Slot(slotDetails));
         event.save(function (error, event) {
            if (error) throw error;
         });
      })
   }

   var registerSlot = function (eventId, slotId, details, callback) {
      findById(eventId, function (event){
         if (!event) return;
         event.slots.forEach(function (slot){
            if (slot._id == slotId) {
               slot.details = details;
               event.save(function (error, event) {
                  if (error) throw error;
                  callback(true);
               });
               return;
            }
         });
      });
   }

   var freeSlot = function (eventId, slotId, callback) {
      findById(eventId, function (event) {
         if (!event) return;
         event.slots.forEach(function (slot) {
            if (slot._id == slotId) {
               slot.details = false;
               event.save(function (error, event) {
                  if (error) throw error;
                  callback(true);
               });
               return;
            }
         });
      });
   }

   return {
      Event: Event,
      findByOwnerId: findByOwnerId,
      findById: findById,
      createEvent: createEvent,
      deleteEvent: deleteEvent,
      addSlot: addSlot,
      registerSlot: registerSlot,
      freeSlot: freeSlot
   }
}
