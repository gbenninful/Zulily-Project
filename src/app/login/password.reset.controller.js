(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('ResetPasswordController', ResetPasswordController)

  /** @ngInject */
  function ResetPasswordController ($log, $state, FirebaseAuthService) {
    var vm = this;
    vm.isLoggedIn = !!(FirebaseAuthService.getAuth());

    vm.sendPasswordResetEmail = function sendPasswordResetEmail () {
      return FirebaseAuthService.sendPasswordResetEmail(vm.user.email)
        .then(function () {
          $log.log('Please reset your password asap...: ');
          $state.go('login');
        })
        .catch(function () {
          $log.error('Unable to reset your password. Please retype your password...');
        })
    }
  }

})()

