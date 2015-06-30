'use strict';

angular.module('bookjumpApp')
  .controller('MybooksCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/books/user/' + $scope.getCurrentUser()._id).success(function(books){
      $scope.books=books;
    })

    $scope.addBook = function(){
      $(".btn").prop("disabled",true);
      $(".form-control").prop("disabled",true);
      $http.post('/api/books/add/' + $scope.newBook + '/' + $scope.getCurrentUser()._id).success(function(book){
        $http.get('/api/books/user/' + $scope.getCurrentUser()._id).success(function(books) {
          $scope.books=books;
          $(".btn").prop("disabled",false);
          $(".form-control").prop("disabled",false);
          $scope.newBook="";
        });
      }).
      error(function(){
        alert("Something went wrong, try again or refresh the page");
        $(".btn").prop("disabled",false);
        $(".form-control").prop("disabled",false);
      });
    }

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id).success(function(){
        $http.get('/api/books/user/' + $scope.getCurrentUser()._id).success(function(books) {
          $scope.books=books;
        });
      })
    }
  });
