'use strict';

describe('Directive: request', function () {

  // load the directive's module and view
  beforeEach(module('bookjumpApp'));
  beforeEach(module('app/request/request.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<request></request>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the request directive');
  }));
});