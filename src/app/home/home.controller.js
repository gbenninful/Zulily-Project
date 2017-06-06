(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($log, catalog, currentUser, FirebaseDataService) {
    var vm = this;
    vm.catalog = catalog;
    var preferences = {};
    var filteredItems = [];

    $log.log('Catalog: ', catalog);

    if (currentUser) {
      FirebaseDataService.getUser(currentUser.uid).$loaded().then(function (response) {
        preferences = response.preferences;
        var preferencesKeys =  Object.keys(preferences);
        $log.info('preferencesKeys: ', preferencesKeys);

        _.each(vm.catalog, function (product) {
          _.each(preferencesKeys, function (pref) {
            if (pref ===  product.category) {
              filteredItems.push(product);
            }
          })
        });

        $log.info('Filtered Items: ', filteredItems);
        vm.catalog = filteredItems;

      }).catch(function (error){
        $log.error('Sorry, unable to loaded user preferences: ', error);
      })
    }
  }

})();
