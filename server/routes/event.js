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
}