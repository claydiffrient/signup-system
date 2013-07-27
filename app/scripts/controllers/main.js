'use strict';

angular.module('signupSystemApp')
  .controller('LoginCtrl', function ($scope, $http, $location) {

      //Make sure the form defaults to hidden.
      $scope.registerForm = {show: false};

      /**
       * Show registration form.
       */
      $scope.showRegistration = function () {
         $scope.registerForm.show = !$scope.registerForm.show;
      }

      /**
       * Handle Registration.
       */
      $scope.register = function () {
         if ($scope.registration.password != $scope.registration.passwordConfirm)
         {
            //TODO: Add some error handling here.
            return;
         }

         console.log($scope.registration);
         $http.post('/api/register', $scope.registration)
            .success(function (data, status, headers, config){
               $location.path('/manager');
               return true;
            })
            .error(function(data,status, headers, config){
               return false;
            });
      }

      /**
       * Reset the login fields when clicked.
       */
      $scope.reset = function() {
         $scope.user.email = "";
         $scope.user.password = "";
      }

      /**
       * Handle user login.
       */
      $scope.login = function(){
         $http.post('/api/login', $scope.user)
            .success(function (data, status, headers, config){
               $location.path('/manager');
               return true;
            })
            .error(function (data, status, headers, config){
               console.log(data);
               console.log(status);
               console.log(headers);
               console.log(data);
            });
      }
  });
