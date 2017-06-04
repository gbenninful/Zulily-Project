(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(catalog/*, userPreferences*/) {
    var vm = this;
    vm.catalog = catalog;


  }

})();
