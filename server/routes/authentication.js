/**
 * Routes for all authentication pieces.
 */
module.exports = function(app, models)
{
   /**
    * POST: /api/login
    * Handles inital error checking and login of a user.
    */
   app.post('/api/login', function (req, res ){
      console.log('login request');
      var email = req.param('email', null);
      var password = req.param('password', null);

      if ( null == email || email.length < 1
          || null == password || password.length < 1 ) {
        res.send(400);
        return;
      }

      models.User.login(email, password, function(user) {
        if ( !user ) {
          res.send(401);
          return;
        }
        console.log('login was successful');
        req.session.loggedIn = true;
        req.session.userId = user._id;
        res.send(200);
      });
   });

   /**
    * POST: /api/register
    * Handles registration of a user.
    */
   app.post('/api/register', function (req, res){
      console.log('registration request');
      console.log(req);
      //Store all the variables needed.
      var firstName = req.param('firstName', '');
      var lastName = req.param('lastName', '');
      var email = req.param('email', null);
      var password = req.param('password', null);

      //Send back a 400 error if the email and password aren't at least 1 character.
      if ( null == email || email.length < 1
           || null == password || password.length < 1 ) {
        res.send(400);
        return;
      }

      models.User.register(email, password, firstName, lastName);
      res.send(200);
   });
}