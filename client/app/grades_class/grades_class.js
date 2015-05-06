'use strict';

angular.module('rachaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/grades_class', {
        templateUrl: 'app/grades_class/grades_class.html',
        controller: 'GradesClassCtrl'
      });
  });
