(function () {
  'use strict';

  angular
    .module('zulily')
    .config(routerConfig)

  /** @ngInject */
  function routerConfig ($stateProvider, $urlRouterProvider) {
    createStates(configArray);
    $urlRouterProvider.otherwise('/home');

    function createStates (array) {
      array.forEach(function (configObj) {
        $stateProvider.state(configObj);
      })
    }
  }

  var configArray = [
    {
      name: 'app',
      url: '/app',
      template: '<ui-view/>',
      abstract: true,
      resolve: {
        resolvedUser: checkForAuthenticatedUser
      }
    },
    {
      name: 'app.catalog',
      url: '^/catalog',
      templateUrl: 'app/catalog/catalog.html',
      controller: 'CatalogController',
      controllerAs: 'vm',
      resolve: {
        allPreferences: getAllPreferences,
        catalog: getCatalog
      }
    },
    {
      name: 'app.home',
      url: '^/home',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        catalog: getCatalog
      }
    },
    {
      name: 'app.allPreferences',
      url: '^/allpreferences',
      templateUrl: 'app/preferences/all.preferences.html',
      controller: 'AllPreferencesController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        allPreferences: getAllPreferences
      }
    },
    {
      name: 'app.userPreferences',
      url: '^/userpreferences',
      templateUrl: 'app/preferences/user.preferences.html',
      controller: 'UserPreferencesController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser
      }
    },
    {
      name: 'login',
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    },
    {
      name: 'logout',
      url: '/logout',
      templateUrl: 'app/login/logout.html',
      controller: 'LogoutController',
      controllerAs: 'vm'
    },
    {
      name: 'resetPassword',
      url: '/resetpassword',
      templateUrl: 'app/login/password.reset.html',
      controller: 'ResetPasswordController',
      controllerAs: 'vm'
    },
    {
      name: 'signUp',
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignUpController',
      controllerAs: 'vm'
    }
  ];

  function checkForAuthenticatedUser ($log, $state, FirebaseAuthService) {
    var firebaseUser = FirebaseAuthService.getAuthenticationStateInfo();
    if (firebaseUser) {
      return firebaseUser;
    } else {
      $log.warn('You are not logged in. Navigating back to the login page');
      $state.go('login');
    }
  }

  function getCurrentUser (resolvedUser) {
    return resolvedUser;
  }

  function getCatalog (FirebaseDataService) {
    return FirebaseDataService.getCatalog();
  }

  function getAllPreferences (FirebaseDataService) {
    return FirebaseDataService.getAllPreferences().$loaded();
  }
})();
