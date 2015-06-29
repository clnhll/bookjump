'use strict';

describe('Directive: profile', function () {

  // load the directive's module and view
  beforeEach(module('bookjumpApp'));
  beforeEach(module('app/profile/profile.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile></profile>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the profile directive');
  }));
});