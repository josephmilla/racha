'use strict';

angular.module('rachaApp')
  .controller('QueuesCtrl', function ($scope, $http, socket, $location) {
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
      who: 'Min Li Chan',
      notes: "I'll be in your neighborhood doing errands."
    };
    $scope.todos = [];
    for (var i = 0; i < 15; i++) {
      $scope.todos.push({
        face: '/img/list/60.jpeg',
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };
  });
