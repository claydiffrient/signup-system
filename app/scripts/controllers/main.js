'use strict';

angular.module('signupSystemApp')
  .controller('LoginCtrl', function ($scope) {
      $scope.reset = function() {
         $scope.user.email = "";
         $scope.user.password = "";
      }
      $scope.login = function(user){
         alert("Logging in.");
      }
  });
