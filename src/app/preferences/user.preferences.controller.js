(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('UserPreferencesController', UserPreferencesController)

  /** @ngInject */
  function UserPreferencesController ($log, $state, FirebaseAuthService, FirebaseDataService) {
    var vm = this;
    vm.isLoggedIn = FirebaseAuthService.isUserLoggedIn();

    if (vm.isLoggedIn) {
      var userPreferences = {
        formCompleted: false
      }
      vm.preferences  =  FirebaseDataService.getUserPreferences();

      vm.userPreferences = [
        {name: 'Baby & Maternity', value: 'true'},
        {name: 'Boys', value: 'true'},
        {name: 'Girls', value: 'true'},
        {name: 'Home', value: 'true'},
        {name: 'Men', value: 'true'},
        {name: 'Women', value: 'true'}
      ];

      vm.selectedPreferences = [];
      vm.selectPreference = function (preference) {
        var selectedIndex = vm.selectedPreferences.indexOf(preference);

        if (selectedIndex > -1) {
          vm.selectedPreferences.splice(selectedIndex, 1);
        } else {
          vm.selectedPreferences.push(preference);
        }
      }

      vm.selectAllPreferences = function () {
        if (vm.userPreferences.length === vm.selectedPreferences.length) {

          vm.userPreferences.forEach(function (item) {
            item.isChecked = false;
          })
          vm.selectedPreferences = [];

        } else {
          vm.selectedPreferences = [];
          vm.userPreferences.forEach(function (item) {
            item.isChecked = true;
            vm.selectedPreferences.push(item.name);
          })
        }
      }

      //TODO: Refactor- vm.saveUserPreferences should only save userPreferences.
      //TODO: It shouldn't format vm.selectedPreferences array into a userPreferences object

      //var formatObjToArray = function formatObjToArray () {
      //   var userPreferences = {};
      //   if (vm.selectedPreferences.length > 0) {
      //     vm.selectedPreferences.forEach(function (item) {
      //       if(!userPreferences[item]) {
      //         userPreferences[item] = true;
      //       }
      //     })
      //   }
      //  $log.log('userPreferences- Fmt: ', userPreferences);
      //   return userPreferences;
      // };

      vm.saveUserPreferences = function () {

        if (vm.selectedPreferences.length > 0) {
          vm.selectedPreferences.forEach(function (item) {
            if (!userPreferences[item]) {
              userPreferences[item] = true
            }
          })

          if (userPreferences) {
            userPreferences.formCompleted = true
            vm.preferences.$add(userPreferences)
          }

        }
        $log.log('userPreferences: ', userPreferences)
        $state.go('app.home')
      }

    } else {
      $log.log('Please log in to select your preferences')
    }

  }

})()
