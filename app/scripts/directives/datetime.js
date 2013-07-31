'use strict';

angular.module('signupSystemApp')
  .directive('datetime', function () {
    return {
      templateUrl: 'views/datetime.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        $(element).datetimepicker(scope.$eval(attrs.datetime));
      }
    };
  });
