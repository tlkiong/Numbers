(function () {
	angular.module("Unlimited")
		.controller("unlimitedController", unlimitedController);

	unlimitedController.$inject = ['randomService', '$interval'];
	function unlimitedController (randomService, $interval) {
		var vm= this;
		vm.compareNumber = compareNumber;
		vm.holdIncreaseNo = holdIncreaseNo;
		vm.stopIncrease = stopIncrease;

		vm.resultArray = [];
		vm.numberInput = {};
		var oriNumberInput = {
			one: 0,
			two: 0,
			three: 0,
			four: 0
		};
		var result = {
			inputNumber: "",
			correctNumberNPlaceCount: 0,
			correctNumberNWrongPlaceCount: 0
		};
		// Format of number generated will be same as vm.numberInput
		var numberGenerated = {};
		var promise;

		/* Services */
		vm.randomService = randomService;

		/* Public Methods */
		function stopIncrease() {
			$interval.cancel(promise);
		}

		function holdIncreaseNo(value) {
			promise = $interval(function () { 
				if(vm.numberInput[value] < 9) {
					vm.numberInput[value] += 1;
				} else {
					vm.numberInput[value] = 0;
				}
			}, 100);
		}

		function compareNumber() {
			var inputObj = {},
				correctNumberNPlaceCount = 0,
				correctNumberNWrongPlaceCount = 0,
				tempArr = [];
				
			angular.copy(vm.resultArray, tempArr);
			angular.copy(vm.numberInput, inputObj);

			clearInput();

			for (var key1 in inputObj) {
				if (inputObj.hasOwnProperty(key1)) {
					if(inputObj[key1] == numberGenerated[key1]) {
						correctNumberNPlaceCount++;
					} else {
						for(var key2 in numberGenerated){
							if((numberGenerated.hasOwnProperty(key2)) && (inputObj[key1] == numberGenerated[key1])){
								correctNumberNWrongPlaceCount++;
								break;
							}
						}
					}
				}
			}

			result.inputNumber = inputObj.one + "" + inputObj.two + inputObj.three + inputObj.four;
			result.correctNumberNPlaceCount = correctNumberNPlaceCount;
			result.correctNumberNWrongPlaceCount = correctNumberNWrongPlaceCount;
			tempArr.push(result);
			angular.copy(tempArr, vm.resultArray);
		}

		/* Private Methods */
		function clearInput() {
			angular.copy(oriNumberInput,vm.numberInput);
		}

		function init() {
			vm.randomService.getRandomNumberAsString().then(function (rs){
				if(rs == undefined || rs == null || rs == "") {
					throw new Error("rs is undefined or null: "+rs);
				} else {
					angular.copy(rs, numberGenerated);
				}
			}, function (err) {
				throw new Error("Error getting random number: "+err);
			});
			angular.copy(oriNumberInput,vm.numberInput);
		}

		init();
	}
})();