(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('FirebaseDataService', firebaseDataService)

  /** @ngInject */
  function firebaseDataService (
    $firebaseArray
  ) {

    var userPreferencesRef = firebase.database().ref().child('USER_PREFERENCES');

    return {
      getUserPreferences: getUserPreferences
    }


    function getUserPreferences() {
      return $firebaseArray(userPreferencesRef);
    }

  }

})();
