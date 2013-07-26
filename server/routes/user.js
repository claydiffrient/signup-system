module.exports = function (app, models)
{
   var Authentication = models.Authentication;

   app.get('/user', Authentication.ensureAuthenticated, function(req, res, next) {
     return res.json(req.session.user);
   });
}