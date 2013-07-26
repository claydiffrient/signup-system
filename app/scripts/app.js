'use strict';

angular.module('signupSystemApp', ['ngResource'])
  .config(function ($routeProvider, $locationProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
   //$locationProvider.html5Mode(true);
  })
  .factory('Event', ['$resource', function ($resource){
      return $resource('/api/event/:id');
  }]);
