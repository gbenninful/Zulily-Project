(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('SignUpController', SignUpController)

  /** @ngInject */
  function SignUpController ($log, FirebaseAuthService, $state) {
    var vm = this;

    vm.user = {
      email: '',
      password: ''
     };

    vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();
    vm.signUpUser = function () {
      return FirebaseAuthService.createUserWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(function (firebaseUser) {
          if (firebaseUser) {
            $state.go('app.userPreferences');
          } else {
            $log.error('Error. Unable to sign up new user');
          }
        })
        .catch(function (error) {
          $log.error('Sign up new user failed', error);
        })
    };

  }
})();
