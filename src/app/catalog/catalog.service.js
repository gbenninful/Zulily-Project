(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('CatalogService', CatalogService)

  /** @ngInject */
  function CatalogService ($firebaseArray) {

    var userPreferencesRef = firebase.database().ref().child('USER_PREFERENCES');

    return {
      getUserPreferences: getUserPreferences
    }


    function getUserPreferences() {
      return $firebaseArray(userPreferencesRef);
    }
  }

})();
