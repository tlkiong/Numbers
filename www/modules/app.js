(function(){
  'use strict';
  
  angular.module('Core', [
    'ionic',
    'LokiJS',
    'Menu',
    'Unlimited'
    ])

  .config(function(, $urlRouterProvider, $compileProvider){
      // $urlRouterProvider.otherwise('/main');
      $urlRouterProvider.otherwise('/unlimited');
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
})();