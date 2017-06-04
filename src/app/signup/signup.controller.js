(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('SignUpController', SignUpController)

  /** @ngInject */
  function SignUpController ($log, FirebaseAuthService, FirebaseDataService, $state) {
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
            FirebaseDataService.getAllUsers().$loaded().then(function (response) {
              $log.log('Response for allUsers...', response);
              response.$add(vm.user).then(function () {
                $log.info('New user added...');
                $state.go('app.userPreferences');
              }).catch(function (error) {
                $log.error('Unable to add new user: ', error);
              })
            })
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
