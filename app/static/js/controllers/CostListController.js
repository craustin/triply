
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostListController', ['$scope', '$modal',
	function CostListController($scope, $modal) {

		$scope.beforePriceSave = function(priceText) {
			if (!priceText.match($scope.pricePattern))
				return "price should be a number";
		};

		$scope.beforeCostSave = function(index, data) {
			// TODO: validate data
			$scope.processCostForm(index, data);
			return false;
		};

	}]);
