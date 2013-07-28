'use strict';

angular.module('signupSystemApp')
  .controller('ManagerEventCtrl', function ($scope, $routeParams, Event) {

      $scope.showName = false;

      $scope.id = $routeParams.id;
      $scope.event = Event.get({id: $scope.id}, function (event)
         {
            if (event.slots.length > 0)
            {
               event.slots.forEach(function (slot){
                  if (slot.name)
                  {
                     $scope.showName = true;
                  }
               });
            }
         });
  });
