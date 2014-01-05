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
	'xeditable',
	'LocalStorageModule'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/ideas/:tripId', {
			templateUrl: 'static/partials/trip-ideas.html',
			controller: 'TripIdeasController'
		}).
		when('/costs/:tripId', {
			templateUrl: 'static/partials/cost-sharing.html',
			controller: 'CostSharingController'
		}).
		when('/', {
			templateUrl: 'static/partials/new-trip-costs.html',
			controller: 'NewTripCostsController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);
