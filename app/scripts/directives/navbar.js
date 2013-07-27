'use strict';

angular.module('signupSystemApp')
  .directive('navbar', function (UserEvents) {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
         if (attrs.role == 'manager')
         {
            scope.events = UserEvents.query({id: 'me'});
         }
         if (attrs.role == 'admin')
         {
            //Admin navbar
         }
         if (attrs.role == 'public')
         {
            $('#navEvents').hide();
         }
      }
    };
  });
