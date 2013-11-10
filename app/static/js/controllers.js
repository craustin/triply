'use strict';

/* Controllers */

console.info('controllers.js');

var controllers = angular.module('triplyApp.controllers', []);

controllers.controller('AsdfController', ['$scope',
	function AsdfController($scope) {
		console.info('asdf');
	}]);

controllers.controller('CostSharingController', ['$scope',
	function CostSharingController($scope) {
		console.info('cost sharing controller');
	}]);
