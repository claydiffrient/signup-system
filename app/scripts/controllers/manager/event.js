'use strict';

angular.module('signupSystemApp')
  .controller('ManagerEventCtrl', function ($scope, $routeParams, Event) {
      $scope.id = $routeParams.id;
      $scope.event = Event.get({id: $scope.id});
  });
