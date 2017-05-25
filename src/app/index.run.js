(function() {
  'use strict';

  angular
    .module('zulily')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
