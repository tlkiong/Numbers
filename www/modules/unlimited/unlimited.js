(function () {
	angular.module("Unlimited", [])
		.config(function ($stateProvider) {
			$stateProvider.state('unlimited', {
                url: '/unlimited',
                templateUrl: './modules/unlimited/unlimited.html',
                controller: 'unlimitedController as vm'
            });
		})
})();