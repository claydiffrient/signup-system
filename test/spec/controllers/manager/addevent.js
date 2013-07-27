'use strict';

describe('Controller: ManagerAddeventCtrl', function () {

  // load the controller's module
  beforeEach(module('signupSystemApp'));

  var ManagerAddeventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagerAddeventCtrl = $controller('ManagerAddeventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
