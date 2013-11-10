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
	$routeProvider.when('/share-costs', {templateUrl: 'static/partials/cost_sharing.html', controller: 'CostSharingController'});
	$routeProvider.otherwise({redirectTo: '/share-costs'});
}]);
