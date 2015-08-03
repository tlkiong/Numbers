(function () {
	angular.module("Unlimited")
		.controller("unlimitedController", unlimitedController);

	unlimitedController.$inject = ['randomService'];
	function unlimitedController (randomService) {
		var vm= this;
		vm.compareNumber = compareNumber;

		vm.resultArray = [];
		vm.numberInput = {};
		var result = {
			inputNumber: "",
			correctNumberNPlaceCount: 0,
			correctNumberNWrongPlaceCount: 0
		};
		// Format of number generated will be same as vm.numberInput
		var numberGenerated = {};

		/* Services */
		vm.randomService = randomService;

		/* Public Methods */
		function compareNumber() {
			var inputObj = {};
			var correctNumberNPlaceCount = 0;
			var correctNumberNWrongPlaceCount = 0;

			angular.copy(vm.numberInput, inputObj);

			clearForm();

			for (var key1 in inputObj) {
				if (inputObj.hasOwnProperty(key1)) {
					if(inputObj[key1] == numberGenerated[key1]) {
						correctNumberNPlaceCount++;
					} else {
						for(var key2 in numberGenerated){
							if((numberGenerated.hasOwnProperty(key2)) && (inputObj[key1] == numberGenerated[key])){
								correctNumberNWrongPlaceCount++;
								break;
							}
						}
					}
				}
			}

			result.inputNumber = inputObj.one + inputObj.two + inputObj.three + inputObj.four;
			result.correctNumberNPlaceCount = correctNumberNPlaceCount;
			result.correctNumberNWrongPlaceCount = correctNumberNWrongPlaceCount;
			vm.resultArray.push(result);
		}

		/* Private Methods */
		function clearForm() {
			angular.copy({},vm.numberInput);
			vm.inputForm.$setPristine();
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
			})
		}

		init();
	}
})();