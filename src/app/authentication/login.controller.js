(function () {
  'use strict';

  angular
    .module('zulily')
    .controller('LoginController', LoginController)

  /** @ngInject */
  function LoginController ($log, $state, FirebaseAuthService/*, userPreferences*/) {
    var vm = this;
    vm.loginUser = function loginUser () {
       return FirebaseAuthService.loginUser(vm.user.email, vm.user.password).then(function () {
          vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();

          if (vm.isLoggedIn)  {
            //$log.log('userPreferences questionnaire completed: ', _isEmpty(userPreferences));
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
