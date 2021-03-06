(function() {
    'use strict';

    angular.module("Menu", [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('menu', {
                    url: 'menu',
                    views: {
                        main: {
                            templateUrl: './modules/menu/menu.html',
                            controller: 'menuController',
                            controllerAs: 'vm'
                        }
                    }
                });
        })
})();
