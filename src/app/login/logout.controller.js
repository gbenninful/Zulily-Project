(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('LogoutController', LogoutController);

  /** @ngInject */
  function LogoutController ($log, $state, FirebaseAuthService) {
    $log.info('Inside LogoutController...');
    var vm = this;
    vm.isLoggedIn = FirebaseAuthService.getAuth();
    $log.info('vm.isLoggedIn Before: ', vm.isLoggedIn);
    vm.logoutUser = function logoutUser ()  {
      $log.log('Inside logoutUser');
      FirebaseAuthService.logoutUser()
        .then(function () {
          vm.isLoggedIn = FirebaseAuthService.getAuth();
          $log.info('vm.isLoggedIn After: ', vm.isLoggedIn);
        });
    }
  }

})();
