'use strict';

angular.module('bookjumpApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/allbooks', {
        templateUrl: 'app/allbooks/allbooks.html',
        controller: 'AllbooksCtrl'
      });
  });
