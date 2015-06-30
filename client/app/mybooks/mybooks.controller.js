'use strict';

angular.module('bookjumpApp')
  .controller('MybooksCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.approved = [];
    $scope.otherApproved=[];
    $scope.show=0;
    $http.get('/api/books/user/' + $scope.getCurrentUser()._id).success(function(books){
      $scope.books=books;
    })

    $scope.approve = function(req) {
      $http.put('/api/requests/' + req._id, req).success(function(){
        $http.get('/api/requests/user/' + $scope.getCurrentUser()._id).success(function(data) {
          $scope.otherReqs = data;
          $scope.approved=[];
          $scope.otherReqs.forEach(function(item) {
            if (item.approved){
              $scope.approved.push(item);
            }
          });
          $scope.otherReqs = $scope.otherReqs.filter(function(item){return !item.approved});
        })
      });
    }

    $scope.cancelReq = function(req) {
      var book;
      $http.get('/api/books/' + req.bookid).success(function(item){
        book = item;
        $http.put('/api/books/' + req.bookid, book).success(function() {});
        $http.delete('/api/requests/' + req._id).success(function(){
          $scope.refreshReqs();
        })
      })
      }
    $scope.refreshReqs = function() {
      $http.get('/api/requests/my/' + $scope.getCurrentUser()._id).success(function(data) {
        $scope.myReqs = data;
        $scope.otherApproved=[];
        $scope.myReqs.forEach(function(item) {
          if (item.approved){
            $scope.otherApproved.push(item);
          }
        });
        $scope.myReqs = $scope.myReqs.filter(function(item){return !item.approved});
      })
      $http.get('/api/requests/user/' + $scope.getCurrentUser()._id).success(function(data) {
        $scope.otherReqs = data;
        $scope.approved=[];
        $scope.otherReqs.forEach(function(item) {
          if (item.approved){
            $scope.approved.push(item);
          }
        });
        $scope.otherReqs = $scope.otherReqs.filter(function(item){return !item.approved});
      })


    }

$scope.refreshReqs();

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
