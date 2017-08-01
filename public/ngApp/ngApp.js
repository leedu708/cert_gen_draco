var draco = angular.module('draco', ['ui.router', 'ngAnimate', 'ngSanitize']);

draco.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/index.html',
      controller: 'homeCtrl'
    })

    .state('user', {
      url: '/user/:email',
      templateUrl: 'views/user.html',
      controller: 'userCtrl'
    })
});

draco.run(function($rootScope) {
  $rootScope.$on('$stateChangeError', console.log.bind(console));
});
