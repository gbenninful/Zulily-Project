(function () {
  'use strict'

  angular
    .module('zulily')
    .config(routerConfig)

  /** @ngInject */
  function routerConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider.state(appState);
    $stateProvider.state(homeState);
    $stateProvider.state(loginState);
    $stateProvider.state(logoutState);
    $stateProvider.state(resetPasswordState);
    $stateProvider.state(signUpState);
    $stateProvider.state(userPreferencesState);
    $urlRouterProvider.otherwise('/^/home');
  }


  var appState = {
    name: 'app',
    url: '/app',
    template: '<ui-view/>',
    abstract: true,
    resolve: {
      resolvedUser: checkForAuthenticatedUser
    }
  };

  var homeState = {
    name: 'app.home',
    url: '^/home',
    templateUrl: 'app/main/main.html',
    controller: 'MainController',
    controllerAs: 'vm',
    resolve: {
      currentUser: getCurrentUser
    }
  };

  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  };

  var logoutState = {
    name: 'logout',
    url: '/logout',
    templateUrl: 'app/login/logout.html',
    controller: 'LogoutController',
    controllerAs: 'vm'
  };

  var resetPasswordState = {
    name: 'resetPassword',
    url: '/resetpassword',
    templateUrl: 'app/login/password.reset.html',
    controller: 'ResetPasswordController',
    controllerAs: 'vm'
  };

  var signUpState = {
    name: 'signUp',
    url: '/signup',
    templateUrl: 'app/signup/signup.html',
    controller: 'SignUpController',
    controllerAs: 'vm'
  };

  var userPreferencesState = {
    name: 'app.userPreferences',
    url: '^/userpreferences',
    templateUrl: 'app/user.preferences/user.preferences.html',
    controller: 'UserPreferencesController',
    controllerAs: 'vm',
    resolve: {
      currentUser: getCurrentUser
    }
  };

  function checkForAuthenticatedUser($log, $state, FirebaseAuthService) {
    var firebaseUser = FirebaseAuthService.getAuth();
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

})()
