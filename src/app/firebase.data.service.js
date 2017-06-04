(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('FirebaseDataService', firebaseDataService)

  /** @ngInject */
  function firebaseDataService ($firebaseArray) {

    var rootRef = firebase.database().ref();
    var userPreferencesRef = rootRef.child('USER_PREFERENCES');
    var catalogRef = rootRef.child('CATALOG');
    var allPreferencesRef = rootRef.child('ALL_PREFERENCES');
    var allUsers = rootRef.child('USERS');

    return {
      getAllPreferences: getAllPreferences,
      getAllUsers: getAllUsers,
      getCatalog: getCatalog,
      getUserPreferences: getUserPreferences
    }


    function getUserPreferences() {
      return $firebaseArray(userPreferencesRef);
    }

    function getCatalog() {
      return $firebaseArray(catalogRef);
    }

    function getAllPreferences () {
      return $firebaseArray(allPreferencesRef);
    }

    function getAllUsers () {
      return $firebaseArray(allUsers);
    }
  }

})();
