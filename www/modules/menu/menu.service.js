(function (){
	'use strict';

	angular.module('Menu')
		.service('menuService', menuService);

		menuService.$inject = ['$state'];
		function menuService($state){
			var vm = this;
			vm.goToState = goToState;

			/* Data Services */


			/* Public Methods */
			function goToState(stateName) {
				if (stateName == undefined || stateName == null) {
					throw new Error ("State name cannot be undefined or null");
				} else {
					$state.go(stateName);
				}
			}

			/* Private Methods */
			function init() {

			}

			init();
		}
})();