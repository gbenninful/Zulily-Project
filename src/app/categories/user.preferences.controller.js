(function () {
  'use strict'

  angular
    .module('zulily')
    .controller('UserPreferencesController', UserPreferencesController)

  /** @ngInject */
  function UserPreferencesController ($log, $state, productCategories, FirebaseAuthService, FirebaseDataService) {
    var vm = this;
    vm.selectedPreferences = [];
    vm.user = {};
    vm.categories = productCategories;
    var userPreferences = {};

    var firebaseUser = FirebaseAuthService.getAuthenticationStateInfo();

    if (firebaseUser) {
      vm.selectPreference = function (preference) {
        var selectedIndex = vm.selectedPreferences.indexOf(preference);

        if (selectedIndex > -1) {
          vm.selectedPreferences.splice(selectedIndex, 1);
        } else {
          vm.selectedPreferences.push(preference);
        }
      }

      vm.selectAllPreferences = function () {
        if (vm.categories.length === vm.selectedPreferences.length) {

          vm.categories.forEach(function (item) {
            item.isChecked = false;
          })
          vm.selectedPreferences = [];

        } else {
          vm.selectedPreferences = [];
          vm.categories.forEach(function (item) {
            item.isChecked = true;
            vm.selectedPreferences.push(item.name);
          })
        }
      }

        vm.saveUserPreferences = function () {
        FirebaseDataService.getUser(firebaseUser.uid).$loaded().then(function (response) {
          vm.user = response;
          vm.user.formCompleted = true;

          if (vm.selectedPreferences.length > 0) {
            vm.selectedPreferences.forEach(function (item) {
              if (!userPreferences[item]) {
                userPreferences[item] = true;
              }
            });
          }

          vm.user.preferences = userPreferences;

          vm.user.$save().then(function () {
            $log.log('Saved vm.user to USERS ', vm.user);
            $state.go('app.home');

          }).catch(function (error) {
            $log.error('Unable to save user: ', error);
          });
        }).catch(function (error) {
          $log.error('Unable to get User object: ', error);
        });
      }
    } else {
      $log.log('Please log in to select your preferences');
    }
  }

})();
