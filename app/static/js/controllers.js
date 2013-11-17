'use strict';

/* Controllers */

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostSharingController', ['$scope', '$modal',
	function CostSharingController($scope, $modal) {

		// values declared on this scope will be accessible on the scopes of all child controllers
		// (child controllers are controllers for all subsections of the cost_sharing page, 
		// including those included via ng-include)

		$scope.people = [
			{ name: 'Craig' },
			{ name: 'Xiaoyi' },
			{ name: 'Jim' },
			{ name: 'Wendy' },
			{ name: 'Ankur' },
			{ name: 'Alex' },
			{ name: 'Eric' }
		];

		$scope.costs = [
			{title: 'Food', price: 100, paidBy: 'Craig', paidFor:'Everyone'},
			{title: 'Gas', price: 200.10, paidBy: 'Jim', paidFor:'Everyone'},
			{title: 'Hotel', price: 1000, paidBy: 'Craig', paidFor:'Everyone'}
		];

		$scope.costListTemplate = 'static/partials/cost-list.html';
		$scope.peopleListTemplate = 'static/partials/people-list.html';

		var EditCostModalController = function ($scope, $modalInstance, newCost) {

			$scope.newCost = newCost;

			$scope.create = function (cost) {
				$modalInstance.close(cost);
			};

			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.addCost = function() {
			$scope.editCost(-1);
		};

		$scope.editCost = function(index, originalCost) {

			var modalInstance = $modal.open({
				templateUrl: 'static/partials/edit-cost-modal.html',
				controller: EditCostModalController,
				resolve: {
					newCost: function() {
						if (!originalCost)
							return {};

						var copy = {
								title: originalCost.title,
								price: originalCost.price,
								paidBy: originalCost.paidBy,
								paidFor: originalCost.paidFor
							};
						return copy;
					}
				}
			});

			modalInstance.result.then(function (cost) {
				if (index >= 0)
					$scope.costs[index] = cost;
				else
					$scope.costs.push(cost);
			});
		};
	}]);

controllers.controller('CostListController', ['$scope', '$modal',
	function CostListController($scope, $modal) {

	}]);

controllers.controller('PeopleListController', ['$scope', '$modal',
	function PeopleListController($scope, $modal) {

		var NewPersonModalController = function ($scope, $modalInstance) {

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
				$scope.people.push({ name: name });
			});
		};
	}]);
