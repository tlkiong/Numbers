(function(){
	'use strict';
	
	angular.module('Core')
		.service('randomService', randomService);

		randomService.$inject = ['common'];
		function randomService (common){

			var service = this;
			service.getRandomNumberAsString = getRandomNumberAsString;

			function getRandomNumberAsString(){
				var deferred = common.$q.defer();

				var fourDigitNumberObj = {
					one: Math.floor((Math.random() * 10) + 1),
					two: Math.floor((Math.random() * 10) + 1),
					three: Math.floor((Math.random() * 10) + 1),
					four: Math.floor((Math.random() * 10) + 1)
				}

				if((fourDigitNumberObj.one >= 0 && fourDigitNumberObj.one < 10) && 
					(fourDigitNumberObj.two >= 0 && fourDigitNumberObj.two < 10) && 
					(fourDigitNumberObj.three >= 0 && fourDigitNumberObj.three < 10) && 
					(fourDigitNumberObj.four >= 0 && fourDigitNumberObj.four < 10)){
					deferred.resolve(fourDigitNumberObj);
				} else {
					getRandomNumberAsString();
					// deferred.reject("Error: "+fourDigitNumberObj);
				}

				return deferred.promise;
			}
		}

}());