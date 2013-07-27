'use strict';

angular.module('signupSystemApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider, $provide, $httpProvider, $compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl'
      })
      .when('/public/events/:id', {
        templateUrl: 'views/public.html',
        controller: 'PublicCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/manager', {
        templateUrl: 'views/manager.html',
        controller: 'ManagerCtrl'
      })
      .when('/manager/addevent', {
        templateUrl: 'views/manager/addevent.html',
        controller: 'ManagerAddeventCtrl'
      })
      .when('/manager/event/:id', {
        templateUrl: 'views/manager/event.html',
        controller: 'ManagerEventCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      //Setup global AJAX errors
      var elementList = $();
      var showMessage = function (content, cssClass, time) {
        $('<div>')
            .addClass('alert')
            .addClass(cssClass)
            .hide()
            .fadeIn('fast')
            .delay(time)
            .fadeOut('fast', function (){$(this).remove();})
            .appendTo(elementList)
            .text(content)
            .append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
      };

      $httpProvider.responseInterceptors.push(function($timeout, $q) {
         return function (promise) {
            return promise.then(function (successResponse) {
               if (successResponse.config.method.toUpperCase() != 'GET') {
                  showMessage('Success', 'alert-success', 5000);
               }
               return successResponse;
            }, function (errorResponse) {
                  switch (errorResponse.status) {
                     case 401:
                        showMessage('Wrong username or password', 'alert-error', 10000);
                        break;
                     case 403:
                        showMessage('You don\'t have the right to do this', 'alert-error', 10000);
                        break;
                     case 500:
                        showMessage('Server internal error ' /*+errorResponse.data*/, 'alert-error', 10000);
                        break;
                     default:
                        showMessage('Error ' + errorResponse.status + ': ' /*+ errorResponse.data*/, 'alert-error', 10000);
                  }
                  return $q.reject(errorResponse);
            });
         };
      });

      $compileProvider.directive('appMessages', function() {
         var directiveDefinitionObject = {
            link: function (scope, element, attrs) {elementList.push($(element));}
         };
         return directiveDefinitionObject;
      });
   //$locationProvider.html5Mode(true);
  })
  .factory('Event', ['$resource', function ($resource){
      return $resource('/api/events/:id', {id: "@Id"});
  }])
  .factory('User', ['$resource', function($resource){
      return $resource('/api/user/:id', {id: "@Id"});
  }])
  .factory('UserEvents', ['$resource', function($resource){
      return $resource('/api/user/:id/events', {id: "@Id"});
  }]);
