(function () {
	angular.module("Unlimited", [])
		.config(function ($stateProvider) {
			$stateProvider
				.state('unlimited', {
                    url: 'unlimited',
                    views: {
                        main: {
                            templateUrl: 'unlimited/unlimited.html',
                            controller: 'unlimitedController',
                            controllerAs: 'vm'
                        }
                    }
                });
		})
})();