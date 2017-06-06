(function () {
  'use strict'

  angular
    .module('zulily')
    .factory('FirebaseDataService', firebaseDataService)

  /** @ngInject */
  function firebaseDataService ($firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();
    var catalogRef = rootRef.child('CATALOG');
    var productCategoriesRef = rootRef.child('ALL_PREFERENCES');
    var allUsers = rootRef.child('USERS');

    return {
      getProductCategories: getProductCategories,
      getAllUsers: getAllUsers,
      getCatalog: getCatalog,
      getPreferences: getPreferences,
      getUser: getUser,
      getUserNode: getUserNode
    }

    function getPreferences(id) {
      var preferenceRef = productCategoriesRef.child(id);
      return $firebaseObject(preferenceRef);
    }

    function getCatalog() {
      return $firebaseArray(catalogRef);
    }

    function getProductCategories () {
      return $firebaseArray(productCategoriesRef);
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
