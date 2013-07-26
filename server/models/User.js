module.exports = function(mongoose){
   var crypto = require('crypto');
   var Schema = mongoose.Schema;

   //Configure the User schema
   var UserSchema = new Schema({
      name: {
         first: {type: String},
         last: {type: String}
      },
      email: {type: String},
      password: {type: String}
   });

   //Create the User model based on the UserSchema.
   var User = mongoose.model('User', UserSchema);

   /**
    * Handles login of a user. Performs callback when completed.
    */
   var login = function (email, password, callback) {
      var shaSum = crypto.createHash('sha256');
      shaSum.update(password);
      User.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
         callback(doc);
      });
   };

   /**
    * Handles registration of a user in the database.
    */
   var register = function (email, password, firstName, lastName){
      var shaSum = crypto.createHash('sha256');
      shaSum.update(password);

      console.log('Registering ' + email);
      var user = new User({
        email: email,
        name: {
          first: firstName,
          last: lastName
        },
        password: shaSum.digest('hex')
      });
      user.save(registerCallback);
      console.log('Save command was sent');
   }

   return {
      login: login,
      register: register,
      User: User
   }
}