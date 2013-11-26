
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostListController', ['$scope', '$modal',
	function CostListController($scope, $modal) {

		$scope.beforeCostSave = function(index, data) {
			// TODO: validate data
			$scope.processCostForm(index, data);
			return false;
		};

	}]);
