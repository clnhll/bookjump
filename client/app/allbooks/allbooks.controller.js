'use strict';

angular.module('bookjumpApp')
  .controller('AllbooksCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $http.get('/api/books/').success(function(books){
      $scope.books=books;
    })
  });
