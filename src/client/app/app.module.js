(function () {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ui.bootstrap',
      'satellizer'
    ])
    .config([
      '$httpProvider',
      '$authProvider',
      '$urlRouterProvider',
      '$locationProvider',
      '$stateProvider',
      appConfig
    ]);
    
    function appConfig($httpProvider, $authProvider, $urlRouterProvider, $locationProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $authProvider.baseUrl = '/api';

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'Home',
          controllerAs: 'vm'
        });
    }
})();
