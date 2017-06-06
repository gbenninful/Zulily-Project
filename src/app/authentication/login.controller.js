(function () {
  'use strict';

  angular
    .module('zulily')
    .controller('LoginController', LoginController)

  /** @ngInject */
  function LoginController ($log, $state, FirebaseAuthService) {
    var vm = this;

    vm.loginUser = function loginUser () {
       return FirebaseAuthService.loginUser(vm.credentials.email, vm.credentials.password).then(function () {
          vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();

          if (vm.isLoggedIn)  {
            $state.go('app.home');
          } else {
            $log.error('There was an error logging in. Please try again...');
          }
        })
        .catch(function (error) {
          vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();
          $log.log('Sorry, authentication failed...', error);
        });
    }
  }

})();
