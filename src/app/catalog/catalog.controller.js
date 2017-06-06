(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('CatalogController', CatalogController);

  /** @ngInject */
  function CatalogController($log, catalog, productCategories) {
    var vm = this;
    vm.catalog = catalog;
    $log.log('catalog: ', catalog);
    vm.categories = productCategories;
    $log.log('vm.categories: ', vm.categories);


    vm.saveCatalogItem = function saveCatalogItem () {
      if (vm.product) {
        $log.info('vm.product: ', vm.product);
        vm.catalog.$add(vm.product);
      }
      vm.product = null;
    }
  }

})();
