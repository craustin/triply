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


		$scope.addPerson = function() {
			console.info('addPerson');
		};
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
