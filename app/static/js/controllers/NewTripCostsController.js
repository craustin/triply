
var controllers = angular.module('triplyApp.controllers');

controllers.controller('NewTripCostsController', ['$scope', '$modal', '$location', 'angularFire',
	function NewTripCostsController($scope, $modal, $location, angularFire) {
		// TODO(AustinC): we're getting too much data, here. we only need the keys.

		var urlTimeline = new Firebase('https://triply.firebaseio.com/timeline');
		angularFire(urlTimeline, $scope, 'tripsTimeline')

		$scope.newTripTimeline = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('timeline/' + randomTripId);
		};

		var urlIdeas = new Firebase('https://triply.firebaseio.com/ideas');
		angularFire(urlIdeas, $scope, 'tripsIdeas')

		$scope.newTripIdeas = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('ideas/' + randomTripId);
		};

		var urlCosts = new Firebase('https://triply.firebaseio.com/costs');
		angularFire(urlCosts, $scope, 'tripsCosts')

		$scope.newTripCosts = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('costs/' + randomTripId);
		};
	}]);
