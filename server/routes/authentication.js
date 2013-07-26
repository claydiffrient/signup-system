/**
 * Routes for all authentication pieces.
 */
module.exports = function(app, models)
{
   //Pull in the passport authentication object.
   Authentication = models.Authentication;

   app.post('/api/login', Authentication.login);
   app.get('/api/logout', Authentication.logout);
}