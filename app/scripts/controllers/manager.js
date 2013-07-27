'use strict';

angular.module('signupSystemApp')
  .controller('ManagerCtrl', function ($scope, UserEvents) {
      $scope.events = UserEvents.query({id: 'me'});
  });
