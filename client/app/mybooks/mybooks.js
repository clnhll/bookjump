'use strict';

angular.module('bookjumpApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mybooks', {
        templateUrl: 'app/mybooks/mybooks.html',
        controller: 'MybooksCtrl'
      });
  });
