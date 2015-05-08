'use strict';

angular.module('rachaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'ngMaterial'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $mdThemingProvider.definePalette('palette1', {
    '50': 'E7CAB1',
    '100': 'E7CAB1',
    '200': 'E7CAB1',
    '300': 'E7CAB1',
    '400': 'E7CAB1',
    '500': 'E7CAB1',
    '600': 'E7CAB1',
    '700': 'E7CAB1',
    '800': 'E7CAB1',
    '900': 'E7CAB1',
    'A100': 'E7CAB1',
    'A200': 'E7CAB1',
    'A400': 'E7CAB1',
    'A700': 'E7CAB1',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('palette2', {
    '50': 'E3B38A',
    '100': 'E3B38A',
    '200': 'E3B38A',
    '300': 'E3B38A',
    '400': 'E3B38A',
    '500': 'E3B38A',
    '600': 'E3B38A',
    '700': 'E3B38A',
    '800': 'E3B38A',
    '900': 'E3B38A',
    'A100': 'E3B38A',
    'A200': 'E3B38A',
    'A400': 'E3B38A',
    'A700': 'E3B38A',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('palette2')
      .accentPalette('palette1');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
