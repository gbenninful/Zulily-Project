(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('CatalogController', CatalogController);

  /** @ngInject */
  function CatalogController($log, catalog) {
    var vm = this;
    vm.catalog = catalog;

    vm.categories = [
      {name: 'Baby & Maternity', value: 'true'},
      {name: 'Boys', value: 'true'},
      {name: 'Girls', value: 'true'},
      {name: 'Home', value: 'true'},
      {name: 'Men', value: 'true'},
      {name: 'Women', value: 'true'}
    ];

    vm.saveCatalogItem = function saveCatalogItem () {
      if (vm.product) {
        $log.info('vm.product: ', vm.product);
        vm.catalog.$add(vm.product);
      }
      vm.product = null;
    }
  }

})();
