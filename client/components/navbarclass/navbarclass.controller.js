// 'use strict';
//
// angular.module('rachaApp')
//   .controller('NavbarClassCtrl', function ($scope, $location, Auth) {
//     $scope.menu = [{
//       'title': 'Home',
//       'link': '/'
//     }];
//
//     $scope.isCollapsed = true;
//     $scope.isLoggedIn = Auth.isLoggedIn;
//     $scope.isAdmin = Auth.isAdmin;
//     $scope.getCurrentUser = Auth.getCurrentUser;
//
//     $scope.logout = function() {
//       Auth.logout();
//       $location.path('/login');
//     };
//
//     $scope.isActive = function(route) {
//       return route === $location.path();
//     };
//   });

'use strict';

angular.module('rachaApp')
  .controller('NavbarClassCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.goBack = function() {
      window.history.back();
    };
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
