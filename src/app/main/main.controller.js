(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, FirebaseAuthService) {
    var vm = this;

    vm.isLoggedIn = FirebaseAuthService.getAuth();
    $log.info('vm.isLoggedIn...: ', vm.isLoggedIn);

  }
})();
