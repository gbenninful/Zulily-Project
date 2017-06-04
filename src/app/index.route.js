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
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        catalog: getCatalog,
        userPreferencesCompleted: isUserPreferencesCompleted
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
      name: 'app.settings',
      url: '^/settings',
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm'
    },
    {
      name: 'app.userPreferences',
      url: '^/userpreferences',
      templateUrl: 'app/preferences/user.preferences.html',
      controller: 'UserPreferencesController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        allPreferences: getAllPreferences
      }
    },
    {
      name: 'login',
      url: '/login',
      templateUrl: 'app/authentication/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'/*,
      resolve: {
        allUsers: getAllUsers
      }*/

    },
    {
      name: 'logout',
      url: '/logout',
      templateUrl: 'app/authentication/logout.html',
      controller: 'LogoutController',
      controllerAs: 'vm'
    },
    {
      name: 'resetPassword',
      url: '/resetpassword',
      templateUrl: 'app/authentication/password.reset.html',
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
      $log.warn('You are not logged in. Navigating back to the authentication page');
      $state.go('login');
    }
  }

  function isUserPreferencesCompleted ($state, FirebaseDataService) {
   FirebaseDataService.getUserPreferences().$loaded().then(function (response) {
     if(_.isEmpty(response)) {
       $state.go('app.userPreferences');
     } else {
       $state.go('app.home');
     }
   });
  }

  function getAllPreferences (FirebaseDataService) {
    return FirebaseDataService.getAllPreferences().$loaded();
  }

  /*function getAllUsers ($log, FirebaseDataService) {
    FirebaseDataService.getAllUsers().$loaded().then(function (response) {
      $log.log('All USERS...: ', response);
      return response;
    }).catch(function (error) {
      $log.error('Unable to get all users... ',  error);
    });
  }*/

  function getCatalog (FirebaseDataService) {
    return FirebaseDataService.getCatalog().$loaded();
  }

  function getCurrentUser (resolvedUser) {
    return resolvedUser;
  }

  /*function getUserPreferences (FirebaseDataService) {
    return FirebaseDataService.getUserPreferences().$loaded();
  }*/

})();
