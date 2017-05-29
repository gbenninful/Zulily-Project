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
      vm.company = {
        name: 'Zulily',
        logo: 'https://a248.e.akamai.net/media.zulily.com/images/new-nav/zulily_logo_no_tagline.png',
        mantra: 'Something Special Every Day'
    }

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
