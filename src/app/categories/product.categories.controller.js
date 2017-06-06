(function() {
  'use strict';

  angular
    .module('zulily')
    .controller('ProductCategoriesController', ProductCategoriesController);

  /** @ngInject */
  function ProductCategoriesController($log, productCategories) {
    var vm = this;
    vm.productCategories = productCategories;
    vm.preferences = '';
    var preferenceArray;
    var preferenceList = [];
    var preferencesObj = {};

    _.each(vm.productCategories, function (preference) {
        preferenceList.push(preference.name);
    });

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
                vm.productCategories.$add(preferencesObj)
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
            vm.productCategories.$add(preferencesObj)
              .catch(function () {
                vm.preferences = '';
                $log.error('Unable to add new preferences');
              });
          } else {
            $log.error('Sorry, no duplicates allowed ', vm.preferences , ' already exist');
          }
          vm.preferences = '';
        }
      }
    }
  }

})();
