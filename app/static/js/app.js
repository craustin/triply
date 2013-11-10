'use strict';

// Declare app level module which depends on filters, and services
angular.module('triplyApp', [
	'ngRoute',
	'triplyApp.filters',
	'triplyApp.services',
	'triplyApp.directives',
	'triplyApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/asdf', {templateUrl: 'static/partials/asdf.html', controller: 'AsdfController'});
	$routeProvider.when('/share-costs', {templateUrl: 'static/partials/cost_sharing.html', controller: 'CostSharingController'});

	// $routeProvider.when('/triply', {templateUrl: 'partials/triply.html', controller: 'TriplyCtrl'});
	// $routeProvider.when('/triply/trips/:tripId', {templateUrl: 'partials/triply.html', controller: 'TripDetailCtrl'});
	$routeProvider.otherwise({redirectTo: '/baleeted'});
}]);
