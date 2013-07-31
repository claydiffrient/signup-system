'use strict';

angular.module('signupSystemApp')
  .controller('ManagerEventCtrl', function ($scope, $routeParams, Event, EventSlot, $location) {

      $scope.showName = false;
      $scope.slot = {};
      $scope.signUpSlot = {};
      $scope.removeSignUp = {};

      $scope.id = $routeParams.id;
      $scope.event = Event.get({id: $scope.id}, function (event) {
            if (event.slots.length > 0)
            {
               event.slots.forEach(function (slot){
                  if (slot.name)
                  {
                     $scope.showName = true;
                  }
                  if (!slot.details) {
                     slot.available = true;
                  }
               });
            }
      });

      $scope.deleteEvent = function () {
         Event.delete({id: $scope.id}, function (){
            $('#deleteEventModal').modal('hide');
            $location.path('/manager');
         });
      }

      $scope.clearAddSlotModal = function () {
         $scope.slot = {};
      }

      $scope.addSlot = function () {
         EventSlot.save({id: $scope.id}, $scope.slot);
      }

      $scope.prepareSignupModal = function (id) {
         $scope.signUpSlot = {};
         $scope.signUpSlot.id = id;
      }

      $scope.prepareRemoveSignupModal = function (id) {
         $scope.removeSignUp = {};
         $scope.removeSignUp.id = id;
      }

      $scope.freeSlot = function() {
         EventSlot.freeup({id: $scope.id, slotId: $scope.removeSignUp.id});
      }

      $scope.signup = function () {
         EventSlot.signup({id: $scope.id, slotId: $scope.signUpSlot.id}, $scope.signUpSlot);
      }

  });
