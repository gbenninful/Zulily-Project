(function() {
  'use strict';

  angular
    .module('zulily')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {

      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($firebaseAuth, $log) {
      var vm = this;
      var auth = $firebaseAuth();

      auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          //$log.log("Signed in as...:", firebaseUser.uid);
          vm.isLoggedIn = true;
        } else {
          $log.error("Signed out");
          vm.isLoggedIn = false;
        }
      });
    }
  }

})();
