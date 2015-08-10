(function() {
	angular.module("Gameplay")
		.service("gameplayService", gameplayService);

		gameplayService.$inject = ["$state", "$ionicPopup"];
		function gameplayService($state, $ionicPopup) {
			var service = this;
			service.initGame = initGame;

			/* ==================== Var ==================== */
			service.gameplayObj = {};

			/* ==================== Services ==================== */

			/* ==================== Public Functions ==================== */
			function initGame(gameType) {

				var gameObj = {
					timer: false,
					noOfSteps: -1
				}

				if(gameType == "timer") {
					gameObj.timer = true;
					gameObj.mode = "timer";
				} else if (!isNaN(gameType)) {
					gameObj.noOfSteps = gameType;
					gameObj.mode = "no of steps";
				} else if (gameType == "endless") {
					gameObj.mode = "endless";
				} else {
					vm.popUp.alert({
	                    title: "ERROR",
	                    template: "<div style='font-weight: bold;'> Gameplay type is not available. Please contact us for the error </div>"
	                });
				}

				angular.copy(gameObj, service.gameplayObj);

				$state.go("/gameplay");
			}

			/* ==================== Private Functions ==================== */
		}

})();