'use strict';

angular.module('rachaApp')
  .controller('CurrentCtrl', function ($scope, $http, socket, $mdDialog) {
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

    $scope.alert = '';
    $scope.getLocation = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Enter Location')
        .content('Location:')
        .ariaLabel('Lucky day')
        .ok('OK')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to get rid of your debt.';
      }, function() {
        $scope.alert = 'You decided to keep your debt.';
      });
    };

    var result = $http.get('http://api.randomuser.me/?results=15').
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log("GET request success");
      console.log(data);


      // capitalizeFirstLetter
      String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }

      // 2 digits
      function fixNumber(n){
        return n > 9 ? "" + n: "0" + n;
      }

      var classes = ['BADM 451', 'BADM 458', 'CS 125', 'CS 173', 'CWL 251', 'ACCY 200', 'ASTR 121', 'BADM 351', 'BUS 101', 'BUS 199', 'BTW 250', 'MATH 220', 'RHET 105', 'SOC 267', 'CS 465']

      $scope.todos = [];
      for (var i = 0; i < 15; i++) {
        $scope.todos.push({
          face: data.results[i].user.picture.thumbnail,
          what: classes[i],
          who: data.results[i].user.name.first.capitalizeFirstLetter()  + " " + data.results[i].user.name.last.capitalizeFirstLetter(),
          notes: Math.floor((Math.random() * 20) + 1) + " minutes, " + Math.floor((Math.random() * 12) + 1) + ":" + fixNumber(Math.floor((Math.random() * 60) + 1)) + " PM"
        });
      }
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("GET request failure");
    });

  });
