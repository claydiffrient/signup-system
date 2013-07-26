'use strict';


module.exports = {
  findById: function(id) {
    return _.clone(_.find(users, function(user) { return user.id === id }));
  },

  findByUsername: function(username) {
    return _.clone(_.find(users, function(user) { return user.username === username; }));
  }
};