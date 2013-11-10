'use strict';

/* Controllers */

console.info('controllers.js');

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostSharingController', ['$scope',
	function CostSharingController($scope) {
		console.info('cost sharing controller asdf!!!');
		$scope.peopleList = 'static/partials/people-list.html';
		console.info($scope.peopleList);
	}]);

controllers.controller('PeopleListController', ['$scope',
	function PeopleListController($scope) {
		console.info('people list controller');

		$scope.people = [
			{ name: 'Craig' },
			{ name: 'Xiaoyi' },
			{ name: 'Jim' },
			{ name: 'Wendy' },
			{ name: 'Ankur' },
			{ name: 'Alex' }
		];
	}]);
