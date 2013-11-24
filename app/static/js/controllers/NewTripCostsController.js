
var controllers = angular.module('triplyApp.controllers');

controllers.controller('NewTripCostsController', ['$scope', '$modal', '$location', 'angularFire',
	function NewTripCostsController($scope, $modal, $location, angularFire) {
		// TODO(AustinC): we're getting too much data, here. we only need the keys.
		var url = new Firebase('https://triply.firebaseio.com/costs');
		angularFire(url, $scope, 'trips')

		$scope.newTrip = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('costs/' + randomTripId);
		};
	}]);
