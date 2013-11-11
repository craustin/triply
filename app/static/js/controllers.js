'use strict';

/* Controllers */

console.info('controllers.js');

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostSharingController', ['$scope',
	function CostSharingController($scope) {

		$scope.costList = 'static/partials/cost-list.html';
		$scope.peopleList = 'static/partials/people-list.html';

		$scope.addPerson = function() {
			console.info('addPerson');
		};
	}]);

controllers.controller('CostListController', ['$scope', '$modal',
	function CostListController($scope, $modal) {
		console.info('cost list controller');

		$scope.costs = [
			{title: 'Food', price: 100, paidBy: 'Craig', paidFor:'Everyone'},
			{title: 'Gas', price: 200.10, paidBy: 'Jim', paidFor:'Everyone'},
			{title: 'Hotel', price: 1000, paidBy: 'Craig', paidFor:'Everyone'}
		];

		console.info($scope.costs[0]);
		console.info($scope.costs[1]);
		console.info($scope.costs[2]);
	}]);

controllers.controller('PeopleListController', ['$scope', '$modal',
	function PeopleListController($scope, $modal) {
		console.info('people list controller');

		$scope.people = [
			{ name: 'Craig' },
			{ name: 'Xiaoyi' },
			{ name: 'Jim' },
			{ name: 'Wendy' },
			{ name: 'Ankur' },
			{ name: 'Alex' },
			{ name: 'Eric' }
		];

		var NewPersonModalController = function ($scope, $modalInstance) {
			console.info('NewPersonModalController');

			$scope.create = function (newPersonName) {
				$modalInstance.close(newPersonName);
			};

			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.addPerson = function() {

			var modalInstance = $modal.open({
				templateUrl: 'static/partials/new-person-modal.html',
				controller: NewPersonModalController
			});

			modalInstance.result.then(function (name) {
				$scope.people.push({ name: name});
			});
		};
	}]);

// controllers.controller('NewPersonModalController', ['$scope', '$modal',
// 	function NewPersonModalController($scope, $modal) {
// 		console.info('NewPersonModalController');
// 	}]);
