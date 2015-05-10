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
    // $scope.getLocation = function(ev) {
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   var confirm = $mdDialog.alert()
    //     .parent(angular.element(document.body))
    //     .title('Enter Location')
    //     .content('Location:')
    //     .ariaLabel('Lucky day')
    //     .ok('OK')
    //     .targetEvent(ev);
    //   $mdDialog.show(confirm).then(function() {
    //     $scope.alert = 'You decided to get rid of your debt.';
    //   }, function() {
    //     $scope.alert = 'You decided to keep your debt.';
    //   });
    // };

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

      var classes = ['BADM 451', 'BADM 458', 'CS 125', 'CS 173', 'CWL 251', 'ACCY 200', 'ASTR 121', 'BADM 351', 'BUS 101', 'BUS 199', 'BTW 250', 'MATH 220', 'RHET 105', 'SOC 267', 'CS 465'];

      $scope.todos = [];
      for (var i = 0; i < 15; i++) {
        $scope.todos.push({
          user: data.results[i].user,
          face: data.results[i].user.picture.thumbnail,
          what: classes[Math.floor((Math.random() * 15) + 0)],
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

    // $scope.callTA = function(ev) {
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   var confirm = $mdDialog.alert()
    //     .parent(angular.element(document.body))
    //     .title('Teaching Assistant')
    //     .content('Join Queue | View Profile | Favorite | Cancel')
    //     .ariaLabel('Lucky day')
    //     .ok('OK')
    //     .targetEvent(ev);
    //   $mdDialog.show(confirm).then(function() {
    //     $scope.alert = 'You decided to get rid of your debt.';
    //   }, function() {
    //     $scope.alert = 'You decided to keep your debt.';
    //   });
    // };

    // $scope.hola = function(user) {
    //   alert(user);
    //   console.log(user);
    //
    // }

    $scope.callTA = function(user) {
      console.log(user);
      $mdDialog.show({
        controller: callTAController,
        // templateUrl: 'dialog1.tmpl.html',
        template:
        '<md-dialog aria-label="List dialog" class="md-primary" layout-padding>' +
           '  <md-dialog-content layout-padding>'+
                '<h4>Teaching Assistant</h4>'+
                '<span><span ng-click="joinQueue()" style="color: #337ab7;">Join Queue</span> | <span ng-click="viewProfile()" style="color: #337ab7;">View Profile</span> | <span ng-click="favorite()" style="color: #337ab7;">Favorite</span>'+
           '  </md-dialog-content>' +
           '  <div class="md-actions">' +
           '    <md-button ng-click="cancelDialog()" class="md-primary">' +
           '      Cancel' +
           '    </md-button>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Ok' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
        // targetEvent: ev
      });

      function callTAController($scope, $mdDialog) {
        $scope.cancelDialog = function() {
          $mdDialog.hide();
        }
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
        $scope.joinQueue = function() {
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .title('Congratulations!')
              .content('You have joined the queue')
              .ariaLabel('Alert Dialog Demo')
              .ok('Ok')
              // .targetEvent(ev)
          );
        };
        $scope.viewProfile = function() {
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          // $mdDialog.show(
          //   $mdDialog.alert()
          //     .parent(angular.element(document.body))
          //     .title('Congratulations!')
          //     .content('You have joined the profile')
          //     .ariaLabel('Alert Dialog Demo')
          //     .ok('Ok')
          //     .targetEvent(ev)
          // );
          console.log(user.name);
          $mdDialog.show({
            // templateUrl: 'dialog1.tmpl.html',
            controller: callTAController,
            template:
            '<md-dialog aria-label="List dialog" class="md-primary" layout-padding>' +
               '  <md-dialog-content layout-padding>'+
                    '<h4>Teaching Assistant Profile</h4>'+
                    '<img ng-src="' +  user.picture.medium + '" class="md-avatar" style="width: 100%;"><br><br>' +
                    '<p>Name: ' + user.name.first.capitalizeFirstLetter() + " " + user.name.last.capitalizeFirstLetter() + '</p>' +
                    '<p>Email: ' + user.email + '</p>'+
                    '<p>Phone: ' + user.cell + '</p>'+
               '  </md-dialog-content>' +
               '  <div class="md-actions">' +
               '    <md-button ng-click="cancelDialog()" class="md-primary">' +
               '      Cancel' +
               '    </md-button>' +
               '    <md-button ng-click="closeDialog()" class="md-primary">' +
               '      Ok' +
               '    </md-button>' +
               '  </div>' +
               '</md-dialog>',
            // targetEvent: ev
          });
        };
        $scope.favorite = function() {
          // Appending dialog to document.body to cover sidenav in docs app
          // Modal dialogs should fully cover application
          // to prevent interaction outside of dialog
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.body))
              .title('Congratulations!')
              .content('You have favorited your TA')
              .ariaLabel('Alert Dialog Demo')
              .ok('Ok')
              // .targetEvent(ev)
          );
        };
      }
    };

    $scope.cancelTA = function(array, index) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Cancel TA Appointment')
        .content('Are you sure you want to cancel?')
        .ariaLabel('Lucky day')
        .ok('OK')
        .cancel('Cancel')
        // .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to get rid of your debt.';
        array.splice(index, 1);
        // alert("Removed");
      }, function() {
        $scope.alert = 'You decided to keep your debt.';
      });
    };

    $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title('This is an alert title')
          .content('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Would you like to delete your debt?')
        .content('All of the banks have agreed to forgive you your debts.')
        .ariaLabel('Lucky day')
        .ok('Please do it!')
        .cancel('Sounds like a scam')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to get rid of your debt.';
      }, function() {
        $scope.alert = 'You decided to keep your debt.';
      });
    };

    $scope.getLocation = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        // templateUrl: 'dialog1.tmpl.html',
        template:
        '<md-dialog aria-label="List dialog" class="md-primary">' +
           '  <md-dialog-content layout-padding>'+
                '<br>'+
                '<md-input-container>'+
                 '<input ng-model="user.location" type="email" placeholder="Enter your location" ng-required="true" class="md-primary" style="float: left;">'+
                '</md-input-container>'+
           '  </md-dialog-content>' +
           '  <div class="md-actions">' +
           '    <md-button ng-click="cancelDialog()" class="md-primary">' +
           '      Cancel' +
           '    </md-button>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Go' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
        targetEvent: ev
      });

      function DialogController($scope, $mdDialog) {
        $scope.cancelDialog = function() {
          $mdDialog.hide();
        }
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    };

  });
