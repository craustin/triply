'use strict';

/* Controllers */

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('CostSharingController', ['$scope', '$routeParams', '$modal', '$q', 'angularFire',
	function CostSharingController($scope, $routeParams, $modal, $q, angularFire) {

		var urlPeople = new Firebase('https://triply.firebaseio.com/costs/' + $routeParams.tripId + '/people');
		$scope.people = [];
		var peoplePromise = angularFire(urlPeople, $scope, 'people')
		
		var urlCosts = new Firebase('https://triply.firebaseio.com/costs/' + $routeParams.tripId + '/costs');
		$scope.costs = [];
		var costsPromise = angularFire(urlCosts, $scope, 'costs')
		
		var urlTripName = new Firebase('https://triply.firebaseio.com/costs/' + $routeParams.tripId + '/tripName');
		$scope.tripName = '';
		var tripNamePromise = angularFire(urlTripName, $scope, 'tripName')
		
		$q.all([peoplePromise, costsPromise, tripNamePromise]).then(function() {

		// values declared on this scope will be accessible on the scopes of all child controllers
		// (child controllers are controllers for all subsections of the cost_sharing page, 
		// including those included via ng-include)

		var sortPeople = function() {
			var comparePeople = function(a, b) { return a.name > b.name; }
			$scope.people.sort(comparePeople);
		}

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
		
		});

	}]);
