(function() {
	'use strict';

	angular.module('Menu')
		.controller('menuController', menuController);

	menuController.$inject = ['menuService'];
	function menuController (menuService) {
		var vm= this;
		vm.goToState = goToState;

		/* Services */
		vm.service = menuService;

		/* Public Methods */
		function goToState(stateName) {
			if(stateName == undefined || stateName ==null) {
				throw new Error ("State name cannot be undefined or null");
			} else {
				vm.service.goToState(stateName);
			}
		}	

		/* Private Methods */
		function init() {

		}

		init();
	}

})();