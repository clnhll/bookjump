'use strict';

angular.module('bookjumpApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.updateProfile = function() {
      $http.put('/api/users/' + $scope.getCurrentUser()._id + '/' + $scope.city + '/' + $scope.state);
    }

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
