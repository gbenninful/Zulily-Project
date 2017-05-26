(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, /*FirebaseAuthService, */currentUser) {
    var vm = this;

    //vm.isLoggedIn = FirebaseAuthService.getAuth();
    vm.isLoggedIn = currentUser;
    $log.info('vm.isLoggedIn...: ', vm.isLoggedIn);
    $log.info('currentUser: ', currentUser);
  }

})();
