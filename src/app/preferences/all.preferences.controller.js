(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('AllPreferencesController', AllPreferencesController);

  /** @ngInject */
  function AllPreferencesController($log, allPreferences) {
    var vm = this;
    vm.allPreferences = allPreferences;
    vm.preferences = '';
    var preferenceArray;
    var preferenceList = [];
    var preferencesObj = {};

    _.each(vm.allPreferences, function (preference) {
        preferenceList.push(preference.name);
    });
    $log.info('PreferenceList...: ', preferenceList);

    vm.addNewPreferences = function addNewPreferences() {
      if (_.isString(vm.preferences) && !_.isEmpty(vm.preferences)) {
        if ((vm.preferences).indexOf(',') > -1) {
          preferenceArray = vm.preferences.split(',');
          if(_.isArray(preferenceArray)) {
            _.each(preferenceArray, function (item) {
              item = item.trim();
              if(preferenceList.indexOf(item) === -1) {
                preferencesObj = {name: item, value: true};
                preferenceList.push(item);
                vm.allPreferences.$add(preferencesObj)
                  .catch(function () {
                    vm.preferences = '';
                    $log.error('Unable to add new preferences');
                  });
              } else {
                $log.error('Sorry, no duplicates allowed', item , 'already exist');
              }
            })
            vm.preferences = '';
          }
        } else {
          if(preferenceList.indexOf(vm.preferences) === -1) {
            preferencesObj = {name : vm.preferences, value: true};
            preferenceList.push(vm.preferences);
            vm.allPreferences.$add(preferencesObj)
              .catch(function () {
                vm.preferences = '';
                $log.error('Unable to add new preferences');
              });
          } else {
            $log.error('Sorry, no duplicates allowed', vm.preferences , 'already exist');
          }
          vm.preferences = '';
        }
      }
    }
  }

})();
