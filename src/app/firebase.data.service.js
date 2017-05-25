(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('FirebaseDataService', firebaseDataService)

  /** @ngInject */
  function firebaseDataService (
    $firebaseArray,
    $firebaseObject
  ) {

    var userPreferencesRef = firebase.database().ref().child('USER_PREFERENCES');

    return {
      getUserPreferences: getUserPreferences
      //getPreferences: getPreferences
    }


    function getUserPreferences() {
      return $firebaseArray(userPreferencesRef);
    }

    /*function getPreferences (id) {
      var preferenceRef = userPreferencesRef.child(id);
      return $firebaseObject(preferenceRef);
    }*/
  }

})();
