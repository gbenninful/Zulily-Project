(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('CatalogController', CatalogController);

  /** @ngInject */
  function CatalogController($log, catalog, allPreferences) {
    var vm = this;
    vm.catalog = catalog;
    vm.categories = allPreferences;


    vm.saveCatalogItem = function saveCatalogItem () {
      if (vm.product) {
        $log.info('vm.product: ', vm.product);
        vm.catalog.$add(vm.product);
      }
      vm.product = null;
    }
  }

})();
