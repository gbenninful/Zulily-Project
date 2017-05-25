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

    vm.isLoggedIn = FirebaseAuthService.getAuth();
    vm.signUpUser = function () {
      return FirebaseAuthService.createUserWithEmailAndPassword(vm.user.email, vm.user.password)
        .then(function (firebaseUser) {
          if (firebaseUser) {
            $log.info('Sign up new user succeeded. Yay!!!');
            $state.go('home');
          } else {
            $log.error('Error. Unable to sign up new user');
          }
        })
        .catch(function (error) {
          $log.error('Sign up new user failed', error);
        })
    };

  }
})()
