'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('signupSystemApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $resource, $httpBackend) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
    });
    $httpBackend.whenPOST('/api/register').respond(true);
  }));

  it("Creates a user", function(){
    scope.registration = {
       firstName: 'Test',
       lastName: 'Test',
       email: 'test@example.com',
       password: 'test',
       passwordConfirm: 'test'
    }
    var finalValue = scope.register();
    expect(finalValue).toBe(true);
  });

});
