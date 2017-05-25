(function() {
  'use strict';

  angular
    .module('zulily')
    .config(config);

  /** @ngInject */
  function config($logProvider) {

// Initialize Firebase
    var config = {
      apiKey: "AIzaSyDRJbUNjnQm8WdF3qSTqBT440fX3EhnhHU",
      authDomain: "zulily-9267c.firebaseapp.com",
      databaseURL: "https://zulily-9267c.firebaseio.com",
      projectId: "zulily-9267c",
      storageBucket: "zulily-9267c.appspot.com",
      messagingSenderId: "1052266609983"
    };
    firebase.initializeApp(config);


    // Enable log
    $logProvider.debugEnabled(true);


  }

})();
