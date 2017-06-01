(function () {
  'use strict'

  angular
    .module('zulily')
    .component('listPreferences', {
      controller: ListPreferencesController,
      controllerAs: 'vm',
      templateUrl: 'app/preferences/list.preferences.component/list.preferences.html'
    });

  /** @ngInject */
  function ListPreferencesController (FirebaseDataService, $log) {

    var vm = this;
    vm.allPreferences = FirebaseDataService.getAllPreferences();
    vm.allPreferences.$loaded()
      .catch(function (error) {
        $log.log('Error: ', error);
      });

    /*vm.readMessage = function readMessage (row) {
      row.user.read = true;
      vm.messages.$save(row);
    }*/
  }

})();
