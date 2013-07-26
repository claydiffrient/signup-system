/**
 * Server file for the express server, which powers the server side functionality.
 */

//Require all dependencies.
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var MemoryStore = require('connect').session.MemoryStore;

//Check to see what environment we are in and set up the mongo credentials.
if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
   var mongo = {
       "hostname":"localhost",
       "port":27017,
       "username":"",
       "password":"",
       "name":"",
       "db":"signup-system"
   };
}

/**
 * Function to establish the proper path to a MongoDB database.
 */
var generateMongoUrl = function(obj){
   obj.hostname = (obj.hostname || 'localhost');
   obj.port = (obj.port || 27017);
   obj.db = (obj.db || 'signup-system');
   if (obj.username && obj.password) {
      return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname +
             ":" + obj.port + "/" + obj.db;
   } else {
      return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
   }
}

/**
 * Construct Express and set up all the configurations for it.
 */
var app = express();
app.sessionStore = new MemoryStore();
app.sessionSecret = 'SocialNetSecret';


app.use(express.logger('dev'));

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

app.use(express.cookieParser());
app.use(express.session({
   secret: app.sessionSecret,
   key: 'express.sid',
   store: app.sessionStore
}));
app.use(express.bodyParser());




console.log({});
//Setup database connections
var dbPath = generateMongoUrl(mongo);
mongoose.connect(dbPath, function onMongooseError(err){
   if (err) throw err;
});

//Setup server and database models
var models = {
   Event: require('./models/Event')(mongoose),
   User: require('./models/User')(mongoose)
};

//Setup the routes.
//NOTE: ./server/routes is specified so this can run from a grunt task.
fs.readdirSync('./server/routes').forEach(function(file){
   if (file[0] == '.') {
      return;
   }
   var routeName = file.substr(0, file.indexOf('.'));
   require('./routes/' + routeName)(app, models);
})

module.exports = app;