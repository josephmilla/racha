'use strict';

angular.module('rachaApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location, $mdDialog) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.alert = '';
    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Forgot your password?')
        .content('Reset it at passwords.cites.illinois.edu')
        .ariaLabel('Lucky day')
        .ok('OK')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to get rid of your debt.';
      }, function() {
        $scope.alert = 'You decided to keep your debt.';
      });
    };
    $scope.signUp = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Forgot your password?')
        .content('Reset it at passwords.cites.illinois.edu')
        .ariaLabel('Lucky day')
        .ok('OK')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to get rid of your debt.';
      }, function() {
        $scope.alert = 'You decided to keep your debt.';
      });
    };
    // $scope.signUp = function(ev) {
    //   $mdDialog.show({
    //     controller: DialogController,
    //     templateUrl: 'dialog1.tmpl.html',
    //     targetEvent: ev,
    //   })
    //   .then(function(answer) {
    //     $scope.alert = 'You said the information was "' + answer + '".';
    //   }, function() {
    //     $scope.alert = 'You cancelled the dialog.';
    //   });
    // };
  });

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
