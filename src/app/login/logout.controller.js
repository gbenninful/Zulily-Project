(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('LogoutController', LogoutController);

  /** @ngInject */
  function LogoutController ($log, FirebaseAuthService) {
    var vm = this;
    vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();
    vm.logoutUser = function logoutUser () {
      if (vm.isLoggedIn) {
        FirebaseAuthService.logoutUser().then(function () {
          vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();
          $log.info('vm.isLoggedIn: ', vm.isLoggedIn);
        })
          .catch(function (error) {
            $log.error('Error, unable to logout, ', error);
          })
      }
    }
  }

})()
