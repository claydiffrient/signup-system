module.exports = function (app, models)
{
   /**
    *  GET: /api/user/:id/events
    *  Returns all events for a given user.
    */
   app.get('/api/user/:id/events', function (req, res){
      var userId = (req.params.id == 'me')
                   ? req.session.userId
                   : req.params.id;
      models.Event.findByOwnerId(userId, function (events) {
         res.send(events);
      });
   });
}