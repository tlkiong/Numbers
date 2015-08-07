(function() {
    angular.module("Gameplay")
        .controller("gameplayController", gameplayController);

    gameplayController.$inject = ['randomService', '$interval', '$ionicPopup'];

    function gameplayController(randomService, $interval, $ionicPopup) {
        var vm = this;
        vm.compareNumber = compareNumber;
        vm.holdIncreaseNo = holdIncreaseNo;
        vm.stopIncrease = stopIncrease;
        vm.showAnswer = showAnswer;

        /* ======================================== Var ======================================== */
        vm.resultArray = [];
        vm.numberInput = {};
        var tryNumber = 0;
        var oriNumberInput = {
            one: 0,
            two: 0,
            three: 0,
            four: 0
        };
        var result = {
            inputNumber: "",
            tryNo: 0,
            correctNumberNPlaceCount: 0,
            correctNumberNWrongPlaceCount: 0
        };
        var oriResultObj = {
        	inputNumber: "",
            tryNo: 0,
            correctNumberNPlaceCount: 0,
            correctNumberNWrongPlaceCount: 0
        }
        // Format of number generated will be same as vm.numberInput
        var numberGenerated = {};
        var promise;

        /* ======================================== Services ======================================== */
        vm.randomService = randomService;
        vm.popUp = $ionicPopup;

        /* ======================================== Public Methods ======================================== */
        function showAnswer() {
        	$ionicPopup.confirm({
				title: "Show Answer",
				template: "<div style='font-size: 1.5em; text-align:left;'>Are you sure you want to show the answer?</div>"
			}).then(function (rs){
				if(rs) {
					// Clicked yes
					var noGenerated = numberGenerated.one + "" + numberGenerated.two + numberGenerated.three + numberGenerated.four
		        	var html = "<div style='font-size: 2em; text-align:center; font-weight:bold'>"+noGenerated+"</div>"
		        	vm.popUp.alert({
		        		title: "Answer",
		        		template: html
		        	}).then(function (rs) {
		        		resetGame();
		        	}, function (err) {
		        		// TODO: Show error dialog?
		        	});
				} 
			}, function (err) {

			});
        }

        function stopIncrease() {
            $interval.cancel(promise);
        }

        function holdIncreaseNo(value) {
            promise = $interval(function() {
                if (vm.numberInput[value] < 9) {
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
                    if (inputObj[key1] == numberGenerated[key1]) {
                        correctNumberNPlaceCount++;
                    } else {
                        for (var key2 in numberGenerated) {
                            if ((numberGenerated.hasOwnProperty(key2)) && (inputObj[key1] == numberGenerated[key2])) {
                                correctNumberNWrongPlaceCount++;
                                break;
                            }
                        }
                    }
                }
            }
            result.tryNo = ++tryNumber;
            result.inputNumber = inputObj.one + "" + inputObj.two + inputObj.three + inputObj.four;
            result.correctNumberNPlaceCount = correctNumberNPlaceCount;
            result.correctNumberNWrongPlaceCount = correctNumberNWrongPlaceCount;
            tempArr.push(result);
            angular.copy(tempArr, vm.resultArray);

            if(result.correctNumberNPlaceCount == 4 && result.correctNumberNWrongPlaceCount == 0) {
                var html = "Congratulations! You have gotten the right answer: <br><div style='font-size: 2em; text-align:center; font-weight:bold'>"+result.inputNumber+"</div>"
                vm.popUp.alert({
                    title: "Congratulations!",
                    template: html
                }).then(function (rs) {
                    resetGame();
                }, function (err) {
                    // TODO: Show error dialog?
                });
                resetGame();
            }
        }

        /* ======================================== Private Methods ======================================== */
        function resetGame() {
        	vm.randomService.getRandomNumberAsString().then(function(rs) {
                if (rs == undefined || rs == null || rs == "") {
                    throw new Error("rs is undefined or null: " + rs);
                } else {
                    angular.copy(rs, numberGenerated);
                }
            }, function(err) {
                throw new Error("Error getting random number: " + err);
            });
            angular.copy(oriNumberInput, vm.numberInput);
            angular.copy([], vm.resultArray);
            tryNumber = 0;
            // TODO: Go to menu
        }

        function clearInput() {
            angular.copy(oriNumberInput, vm.numberInput);
        }

        function init() {
            vm.randomService.getRandomNumberAsString().then(function(rs) {
                if (rs == undefined || rs == null || rs == "") {
                    throw new Error("rs is undefined or null: " + rs);
                } else {
                    angular.copy(rs, numberGenerated);
                }
            }, function(err) {
                throw new Error("Error getting random number: " + err);
            });
            angular.copy(oriNumberInput, vm.numberInput);
        }

        init();
    }
})();
