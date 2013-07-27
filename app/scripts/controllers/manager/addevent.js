'use strict';

angular.module('signupSystemApp')
  .controller('ManagerAddeventCtrl', function ($scope, Event, $location) {
      $scope.event = {};

      /**
       * Create an event and save it in the database.
       */
      $scope.createEvent = function (){
         Event.save({}, $scope.event, function (event){
            $location.path('/manager/event/' + event.eventId);
         });
      }

      $scope.resetEventForm = function () {
        $scope.event = {};
      }




  });
