'use strict';

describe('Controller: AllbooksCtrl', function () {

  // load the controller's module
  beforeEach(module('bookjumpApp'));

  var AllbooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllbooksCtrl = $controller('AllbooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
