(function(){
	'use strict';

	angular.module('Core')
		.service('common', common);

		common.$inject = ['$q'];
		function common($q) {
			this.$q = $q;
		}
})();