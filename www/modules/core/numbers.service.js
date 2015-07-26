(function(){
	'use strict';
	
	angular.module('Core')
		.service('numberService', numberService);

		numberService.$inject = ['common'];
		function numberService (common){

			var service = this;
			service.getRandomNumberAsString = getRandomNumberAsString;

			function getRandomNumberAsString(){
				var deferred = common.$q.defer();

				var randomNumber = Math.floor((Math.random() * 1000) + 1);
				var fourDigitNumberInString = randomNumber.toString();

				if(fourDigitNumberInString){
					deferred.resolve(fourDigitNumberInString);
				} else {
					deferred.reject("Error: "+fourDigitNumberInString);
				}

				return deferred.promise;
			}
		}

}());