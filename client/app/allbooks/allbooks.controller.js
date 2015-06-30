'use strict';

angular.module('bookjumpApp')
  .controller('AllbooksCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $http.get('/api/books/').success(function(books){
      $scope.books=books;
    })
    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id).success(function(){
        $http.get('/api/books/').success(function(books) {
          $scope.books=books;
        });
      })
    }
    $scope.requestBook = function(book) {
      var request = {
        book: book.title,
        bookid: book._id,
        ownerid: book.owner,
        requesterid: $scope.getCurrentUser()._id,
        approved: false
      }
      book.requested=true;
      $http.put('/api/books/' + book._id).success(function(book) {
        $http.get('/api/books/').success(function(books) {
          $scope.books=books;
        });
      })

      $http.post('/api/requests/', request);
    }

  });
