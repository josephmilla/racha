'use strict';

describe('Controller: QueuesClassCtrl', function () {

  // load the controller's module
  beforeEach(module('rachaApp'));

  var QueuesClassCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QueuesClassCtrl = $controller('QueuesClassCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
