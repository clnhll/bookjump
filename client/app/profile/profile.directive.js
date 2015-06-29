'use strict';

angular.module('bookjumpApp')
  .directive('profile', function () {
    return {
      templateUrl: 'app/profile/profile.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });