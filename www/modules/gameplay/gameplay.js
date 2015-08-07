(function () {
	angular.module("Gameplay", [])
		.config(function ($stateProvider) {
			$stateProvider.state('gameplay', {
                url: '/gameplay',
                templateUrl: './modules/gameplay/gameplay.html',
                controller: 'gameplayController as vm'
            });
		})
})();