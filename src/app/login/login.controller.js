(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('LoginController', LoginController)

  /** @ngInject */
  function LoginController ($log, $state, FirebaseAuthService) {
    var vm = this;
    //vm.loggedIn = false;
    vm.loginUser = function loginUser () {
       return FirebaseAuthService.loginUser(vm.user.email, vm.user.password)
        .then(function () {
          vm.isLoggedIn = FirebaseAuthService.getAuth();

          if (vm.isLoggedIn) {
            $log.info('Successfully Logged in...');
            $state.go('home');
          } else {
            $log.error('Your credentials are invalid. Please try again...');
          }
        })
        .catch(function (error) {
          vm.isLoggedIn = FirebaseAuthService.getAuth();
          $log.log('Sorry, login failed...', error);
        });
    }

    vm.sendPasswordResetEmail = function sendPasswordResetEmail () {

    }
  }

})()
