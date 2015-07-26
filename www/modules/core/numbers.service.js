(function(){
	'use strict';

	angular.module('Core', [])
		.service('numberService', numberService);

		numberService.$inject = ['common'];
		function numberService (common){

			var service = this;
			service.getRandomString = getRandomString;
			service.getRandomNumberAsString = getRandomNumberAsString;

			function getRandomNumberAsString(){
				var deferred = common.$q.defer();

				var randomNumber = Math.floor((Math.random() * 1000) + 1);
				var 4digitNumberInString = randomNumber.toString();

				if(4digitNumberInString){
					deferred.resolve(4digitNumberInString);
				} else {
					deferred.reject("Error: "+4digitNumberInString);
				}

				return deferred.promise;
			}
		}

})();