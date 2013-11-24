'use strict';

// Declare app level module which depends on filters, and services
angular.module('triplyApp', [
	'ngRoute',
	'triplyApp.filters',
	'triplyApp.services',
	'triplyApp.directives',
	'triplyApp.controllers',
	'ui.bootstrap',
	'firebase',
	'xeditable'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/costs/:tripId', {
			templateUrl: 'static/partials/cost_sharing.html',
			controller: 'CostSharingController'
		}).
		when('/', {
			templateUrl: 'static/partials/new_trip_costs.html',
			controller: 'NewTripCostsController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);
