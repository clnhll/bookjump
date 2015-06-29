'use strict';

angular.module('bookjumpApp')
  .directive('request', function () {
    return {
      templateUrl: 'app/request/request.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });