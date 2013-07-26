/**
 * The controller for when an anonymous user loads the page.
 * Provides a way to sign up for an event.
 */
'use strict';

angular.module('signupSystemApp')
  .controller('PublicCtrl', function ($scope, Event, $routeParams) {
    $scope.Event = {
      name: Event.get({id: $routeParams.id}),
      id: $routeParams.id
    }
  });
