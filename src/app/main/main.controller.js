(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(catalog) {
    var vm = this;
    vm.catalog = catalog;
  }

})();
