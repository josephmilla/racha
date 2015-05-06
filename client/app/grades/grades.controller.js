'use strict';

angular.module('rachaApp')
  .controller('GradesCtrl', function ($scope, $http, socket, $location) {
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

    var item = {
      face: '/img/list/60.jpeg',
      what: 'Brunch this weekend?',
      grade: 'Min Li Chan',
      notes: "I'll be in your neighborhood doing errands."
    };

    var classes = ['BADM 451', 'BADM 458', 'CS 125', 'CS 173', 'CWL 251', 'ACCY 200', 'ASTR 121', 'BADM 351', 'BUS 101', 'BUS 199', 'BTW 250', 'MATH 220', 'RHET 105', 'SOC 267', 'CS 465'];

    var grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D+', 'D', 'D-', 'F'];

    $scope.class_list = [];
    for (var i = 0; i < 5; i++) {
      var size = Math.floor((Math.random() * 30) + 5);

      $scope.class_list.push({
        face: '/img/list/60.jpeg',
        what: classes[Math.floor((Math.random() * 15) + 0)],
        grade: grades[Math.floor((Math.random() * 13) + 0)],
        notes: Math.floor((Math.random() * size) + 0) + "/" + size
      });
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };
  });
