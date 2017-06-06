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
        productCategories: getProductCategories,
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
      name: 'app.productCategories',
      url: '^/productcategories',
      templateUrl: 'app/categories/product.categories.html',
      controller: 'ProductCategoriesController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        productCategories: getProductCategories
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
      templateUrl: 'app/categories/user.preferences.html',
      controller: 'UserPreferencesController',
      controllerAs: 'vm',
      resolve: {
        currentUser: getCurrentUser,
        productCategories: getProductCategories
      }
    },
    {
      name: 'login',
      url: '/login',
      templateUrl: 'app/authentication/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
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

  function getProductCategories (FirebaseDataService) {
    return FirebaseDataService.getProductCategories().$loaded();
  }

  function getCatalog (FirebaseDataService) {
    return FirebaseDataService.getCatalog().$loaded();
  }

  function getCurrentUser (resolvedUser) {
    return resolvedUser;
  }

  function isUserPreferencesCompleted ($state, $firebaseObject) {
    var firebaseUser = firebase.auth().currentUser;
    var preferenceRef = firebase.database().ref().child("USERS").child(firebaseUser.uid);
    var userPreference;
    if (firebaseUser) {
      $firebaseObject(preferenceRef).$loaded().then(function (response) {
        userPreference = response;

        if(userPreference.formCompleted) {
          $state.go('app.home');
        } else {
          $state.go('app.userPreferences');
        }
      })
    }
  }

})();
