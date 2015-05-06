'use strict';

angular.module('rachaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/queues_class', {
        templateUrl: 'app/queues_class/queues_class.html',
        controller: 'QueuesClassCtrl'
      });
  });
