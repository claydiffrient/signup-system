module.exports = function (app, models)
{
   /**
    *  POST: /api/events
    *  Creates a new event for the current user.
    */
   app.post('/api/events', function (req, res){
      var eventDetails = {
        name: req.param('eventName', ''),
        description: req.param('description', ''),
        owner: req.session.userId
      }
      models.Event.createEvent(eventDetails, function (id) {
         console.log(eventDetails);
         if (id) {
            res.send({eventId:id});
            return;
         }
         res.send(500);
      });
   });

   /**
    * GET: /api/events/:id
    * Returns the given event.
    */
   app.get('/api/events/:id', function (req, res) {
      models.Event.findById(req.params.id, function (event) {
         if (!event) res.send(404);
         else res.send(event);
      });
   });

   /**
    * DELETE: /api/events/:id
    * Deletes the given event
    */
   app.delete('/api/events/:id', function (req, res) {
      models.Event.findById(req.params.id, function (event) {
         if (!event) return;
         models.Event.deleteEvent(event);
         res.send(200);
      });
   });

   /**
    * POST: /api/events/:id/slots
    * Creates a new slot for the given event.
    */
   app.post('/api/events/:id/slots', function (req, res) {
      var slotDetails = {
         name: req.param('name', ''),
         time: req.param('time', 'Z')
      }
      if (slotDetails.time === 'Z') {
         res.send(400);
         return;
      }
      //Make sure time is a date object.
      if (typeof slotDetails.time != "Date") {
         slotDetails.time = new Date(slotDetails.time);
      }
      models.Event.addSlot(req.params.id, slotDetails, function (id) {
         if (id) {
            res.send({slotId: id});
            return;
         }
         res.send(500);
      });
   });

   /**
    * PUT: /api/events/:eventId/slots/:slotId
    * Updates a slot with the given information
    */
   app.put('/api/events/:eventId/slots/:slotId', function (req, res) {
      var eventId = req.params.eventId;
      var slotId = req.params.slotId;
      var details = {
         name : req.param('name', ''),
         email : req.param('email', '')
      };

      if ((name == '') && (email == ''))
      {
         models.Event.freeSlot(eventId, slotId, function (id) {
            if (id) {
               res.send(200);
               return;
            }
            res.send(500);
         });
      }
      else
      {
         models.Event.registerSlot(eventId, slotId, details, function(id) {
            if (id) {
               res.send(200);
               return;
            }
            res.send(500);
         });
      }

   });
}
