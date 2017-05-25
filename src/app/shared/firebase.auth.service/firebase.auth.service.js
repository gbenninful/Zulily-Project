(function () {
  'use strict';

  angular
    .module('zulily')
    .factory('FirebaseAuthService', FirebaseAuthService);

  /** @ngInject */
  function FirebaseAuthService ($log, $firebaseAuth) {
    var auth = $firebaseAuth();

    return {
      authStateChanged: authStateChanged,
      createUserWithEmailAndPassword: createUserWithEmailAndPassword,
      loginUser: loginUser,
      logoutUser: logoutUser,
      getAuth: getAuth,
      sendPasswordResetEmail: sendPasswordResetEmail
    }


    function authStateChanged () {
      return auth.onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
          $log.log('User is logged in: ', firebaseUser);
        } else {
          $log.log('No logged in User:... ', firebaseUser);
        }
      })
    }


    function createUserWithEmailAndPassword (email, password) {
      return auth.$createUserWithEmailAndPassword(email, password);
    }


    function getAuth () {
      return auth.$getAuth();
    }


    function loginUser(email, password) {
      return auth.$signInWithEmailAndPassword(email, password);
    }


    function logoutUser() {
      return auth.$signOut()
        .then(function () {
          $log.info('Logged out of Zulily...');
        })
        .catch(function (error) {
          $log.error('Unable to logout of Zulily...: ', error);
        });
    }


    function sendPasswordResetEmail (email) {
      return auth.$sendPasswordResetEmail(email).then(function() {
        $log.log("Password reset email sent successfully! Please check your email");
      }).catch(function(error) {
        $log.error("Error: ", error);
      });
    }
  }

})();
