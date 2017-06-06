(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('FirebaseDataService', firebaseDataService)

  /** @ngInject */
  function firebaseDataService ($firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();
    var userPreferencesRef = rootRef.child('USER_PREFERENCES');
    var catalogRef = rootRef.child('CATALOG');
    var allPreferencesRef = rootRef.child('ALL_PREFERENCES');
    var allUsers = rootRef.child('USERS');

    return {
      getAllPreferences: getAllPreferences,
      getAllUsers: getAllUsers,
      getCatalog: getCatalog,
      getPreferences: getPreferences,   //TODO: getPreferences & getUserPreferences both have the same purpose. One of them has to go
      getUser: getUser,
      getUserNode: getUserNode,
      getUserPreferences: getUserPreferences
    }


    function getUserPreferences() {
      return $firebaseObject(userPreferencesRef);
    }

    function getPreferences(id) {
      var preferenceRef = userPreferencesRef.child(id);
      return $firebaseObject(preferenceRef);
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

    function getUser (id) {
      return  $firebaseObject(allUsers.child(id));
    }

    function getUserNode (id) {
      return allUsers.child(id);
    }
  }

})();
