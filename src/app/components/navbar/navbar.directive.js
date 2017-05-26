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
    function NavbarController($firebaseAuth, $location, $log) {
      var vm = this;
      var auth = $firebaseAuth();

      auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          vm.isLoggedIn = true;
        } else {
          $log.error("Signed out");
          vm.isLoggedIn = false;
        }
      });

      vm.isActive = function isActive (path) {
        return ($location.path() === path) ? 'active' : '';
      };

    }
  }

})();
