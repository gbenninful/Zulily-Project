(function() {
  'use strict';

  angular
    .module('zulily')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      /*.state('app', {
        url: '/app',
        template: '<ui-view></ui-view>'
      })*/
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/login/logout.html',
        controller: 'LogoutController',
        controllerAs: 'vm'
      })
      .state('resetpassword', {
        url: '/resetpassword',
        templateUrl: 'app/login/password.reset.html',
        controller: 'ResetPasswordController',
        controllerAs: 'vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.html',
        controller: 'SignUpController',
        controllerAs: 'vm'
      })
      .state('userpreferences', {
        url: '/userpreferences',
        templateUrl: 'app/user.preferences/user.preferences.html',
        controller: 'UserPreferencesController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
