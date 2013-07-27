'use strict';

describe('Directive: navbar', function () {
  beforeEach(module('signupSystemApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<navbar></navbar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the navbar directive');
  }));
});
