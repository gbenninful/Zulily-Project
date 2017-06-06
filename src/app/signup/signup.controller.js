(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('SignUpController', SignUpController)

  /** @ngInject */
  function SignUpController ($log, FirebaseAuthService, FirebaseDataService, $state) {
    var vm = this;

    vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();
    vm.signUpUser = function () {
      return FirebaseAuthService.createUserWithEmailAndPassword(vm.credentials.email, vm.credentials.password)
        .then(function (firebaseUser) {
          FirebaseDataService.getUserNode(firebaseUser.uid).set(vm.user).then(function(){
            $state.go('app.userPreferences');
          });
        })
        .catch(function (error) {
          $log.error('Sign up new user failed', error);
        })
    };

  }
})();
