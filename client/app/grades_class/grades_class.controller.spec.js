'use strict';

describe('Controller: GradesClassCtrl', function () {

  // load the controller's module
  beforeEach(module('rachaApp'));

  var GradesClassCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GradesClassCtrl = $controller('GradesClassCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
