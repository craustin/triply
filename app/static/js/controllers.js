'use strict';

/* Controllers */

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostSharingController', ['$scope', '$modal',
	function CostSharingController($scope, $modal) {

		// values declared on this scope will be accessible on the scopes of all child controllers
		// (child controllers are controllers for all subsections of the cost_sharing page, 
		// including those included via ng-include)

		var sortPeople = function() {
			var comparePeople = function(a, b) { return a.name > b.name; }
			$scope.people.sort(comparePeople);
		}

		$scope.people = [
			{ name: 'Craig' },
			{ name: 'Xiaoyi' },
			{ name: 'Jim' },
			{ name: 'Wendy' },
			{ name: 'Ankur' },
			{ name: 'Alex' },
		];
		sortPeople();

		$scope.getEveryone = function() {
			var allPeeps = [];
			for (var i=0; i<$scope.people.length; ++ i)
				allPeeps.push($scope.people[i].name);
			return allPeeps;
		}

		$scope.savePerson = function(person) {
			// TODO: handle the case where the person already exists
			$scope.people.push(person);
			sortPeople();
		};

		$scope.costs = [
			{
				title: 'Food', price: 100, paidBy: 'Craig',
				paidFor: $scope.getEveryone()
			},
			{
				title: 'Gas', price: 200.10, paidBy: 'Jim',
				paidFor: [ 'Craig', 'Xiaoyi' ]
			},
			{
				title: 'Hotel', price: 1000, paidBy: 'Craig',
				paidFor: $scope.getEveryone()
			}
		];

		$scope.getCostTotalForPerson = function(person) {
			// TODO: consider caching this value and updating on cost save
			var total = 0;
			for (var i=0; i<$scope.costs.length; ++i) {
				var cost = $scope.costs[i];
				if (cost.paidBy == person.name)
					total -= cost.price;
				if (cost.paidFor.indexOf(person.name) >= 0)
					total += cost.price / cost.paidFor.length;
			}

			return total;
		};

		$scope.costListTemplate = 'static/partials/cost-list.html';
		$scope.peopleListTemplate = 'static/partials/people-list.html';

		var EditCostModalController = function ($scope, $modalInstance, formText) {

			$scope.formText = formText;

			$scope.create = function (formText) {
				$modalInstance.close(formText);
			};

			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.addCost = function() {
			$scope.editCost(-1);
		};

		$scope.editCost = function(index, originalCost) {

			var convertToCost = function(formText) {

				var addPersonIfNew = function(personName) {
					if ($scope.getEveryone().indexOf(personName) < 0)
						$scope.savePerson({ name: personName });
				}

				var parsePaidBy = function(paidByText) {
					var personName = jQuery.trim(paidByText);
					addPersonIfNew(personName);
					return personName;
				}

				var parsePaidFor = function(paidForText) {
					var peeps = paidForText.split(',');
					for (var i=0; i<peeps.length; ++i)
						peeps[i] = jQuery.trim(peeps[i]);
					peeps.sort();

					if (peeps.length == 1 && peeps[0].toLowerCase() == 'everyone')
						return $scope.getEveryone();

					for (var i=0; i<peeps.length; ++i)
						addPersonIfNew(peeps[i]);

					return peeps;
				};

				var newCost = {};
				newCost.title = formText.titleText;
				newCost.price = formText.priceText;
				newCost.paidBy = parsePaidBy(formText.paidByText);
				newCost.paidFor = parsePaidFor(formText.paidForText);
				return newCost;
			};

			var saveCost = function(cost) {
				if (index >= 0)
					$scope.costs[index] = cost;
				else
					$scope.costs.push(cost);
			};

			var modalInstance = $modal.open({
				templateUrl: 'static/partials/edit-cost-modal.html',
				controller: EditCostModalController,
				resolve: {
					formText: function() {
						if (!originalCost)
							return {};

						// TODO: validate price is number
						var ft = {
								titleText: originalCost.title,
								priceText: originalCost.price,
								paidByText: originalCost.paidBy,
								paidForText: $scope.printPaidFor(originalCost, true)
							};
						return ft;
					}
				}
			});

			modalInstance.result.then(function (formText) {
				var newCost = convertToCost(formText);
				saveCost(newCost);
			});
		};

		$scope.printPaidFor = function(cost, expandPaidFor) {
			if (!expandPaidFor) {
				var usedByEveryone = true;
				for (var i=0; i<$scope.people.length && usedByEveryone; ++i)
					if (cost.paidFor.indexOf($scope.people[i].name) < 0)
						usedByEveryone = false;

				if (usedByEveryone)
					return 'Everyone';
			}

			var pfs = '';
			for (var i=0; i<cost.paidFor.length; ++i) {
				if (i > 0)
					pfs += ', '
				pfs += cost.paidFor[i];
			}

			return pfs;
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

		var getClearPerson = function() {
			var minOwed = Number.MAX_VALUE;
			var clearPerson = '';

			// TODO: consider caching this value and updating on cost save
			for (var i=0; i<$scope.people.length; ++i) {
				var person = $scope.people[i];
				var amountOwed = $scope.getCostTotalForPerson(person);
				if (amountOwed < minOwed) {
					minOwed = amountOwed;
					clearPerson = person.name;
				}
			}

			return clearPerson;
		}

		$scope.isClearPerson = function(person) {
			return getClearPerson() == person.name;
		}

		$scope.printCostTotalForPerson = function(person) {
			return $scope.getCostTotalForPerson(person).toFixed(2);
		};

		$scope.addPerson = function() {

			var modalInstance = $modal.open({
				templateUrl: 'static/partials/new-person-modal.html',
				controller: NewPersonModalController
			});

			modalInstance.result.then(function (name) {
				$scope.savePerson({ name: name });
			});
		};
	}]);
