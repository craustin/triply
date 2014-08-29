'use strict';

/* Controllers */

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('MockupsController', ['$scope', function MockupsController($scope) { }]);

controllers.controller('TripIdeasController', ['$scope', '$routeParams', 'angularFire',
	function TripIdeasController($scope, $routeParams, angularFire) {

		var tripId = $routeParams.tripId;

		var urlTripName = new Firebase('https://triply.firebaseio.com/ideas/' + tripId + '/tripName');
		$scope.tripName = '';
		angularFire(urlTripName, $scope, 'tripName')

	}]);
