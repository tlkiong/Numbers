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

				if(fourDigitNumberObj.one > 0 && 
					fourDigitNumberObj.two > 0 && 
					fourDigitNumberObj.three > 0 && 
					fourDigitNumberObj.four > 0){
					deferred.resolve(fourDigitNumberObj);
				} else {
					deferred.reject("Error: "+fourDigitNumberObj);
				}

				return deferred.promise;
			}
		}

}());