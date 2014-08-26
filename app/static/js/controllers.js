'use strict';

/* Controllers */

angular.module('triplyApp.controllers', []);
var controllers = angular.module('triplyApp.controllers');

controllers.controller('TripTimelineController', ['$scope', '$routeParams', 'angularFire',
	function TripTimelineController($scope, $routeParams, angularFire) {

		var tripId = $routeParams.tripId;

		var urlTripName = new Firebase('https://triply.firebaseio.com/timeline/' + tripId + '/tripName');
		$scope.tripName = '';
		angularFire(urlTripName, $scope, 'tripName');

		$scope.days = ['Day 1', 'Day 2', 'Day 3'];
	}]);

controllers.controller('TripIdeasController', ['$scope', '$routeParams', 'angularFire',
	function TripIdeasController($scope, $routeParams, angularFire) {

		var tripId = $routeParams.tripId;

		var urlTripName = new Firebase('https://triply.firebaseio.com/ideas/' + tripId + '/tripName');
		$scope.tripName = '';
		angularFire(urlTripName, $scope, 'tripName')

	}]);

controllers.controller('CostSharingController', ['$scope', '$routeParams', '$modal', '$q', 'localStorageService', 'angularFire',
	function CostSharingController($scope, $routeParams, $modal, $q, localStorageService, angularFire) {
		
		var tripId = $routeParams.tripId;

		var urlPeople = new Firebase('https://triply.firebaseio.com/costs/' + tripId + '/people');
		$scope.people = [];
		var peoplePromise = angularFire(urlPeople, $scope, 'people')
		
		var urlCosts = new Firebase('https://triply.firebaseio.com/costs/' + tripId + '/costs');
		$scope.costs = [];
		var costsPromise = angularFire(urlCosts, $scope, 'costs')
		
		var urlTripName = new Firebase('https://triply.firebaseio.com/costs/' + tripId + '/tripName');
		$scope.tripName = '';
		var tripNamePromise = angularFire(urlTripName, $scope, 'tripName')

		$q.all([peoplePromise, costsPromise, tripNamePromise]).then(function() {

		// values declared on this scope will be accessible on the scopes of all child controllers
		// (child controllers are controllers for all subsections of the cost_sharing page, 
		// including those included via ng-include)

		$scope.$watch('tripName', function(newVal, oldVal) {
			// trip MRU in header
			var MAX_MRU_ITEMS = 5;
			var tripMRUKey = 'costs.tripMRU';
			var rawTripMRU = localStorageService.get(tripMRUKey);
			var tripMRU = [];
			if (rawTripMRU) {
				tripMRU = $.parseJSON(rawTripMRU);
			}
			var idx = tripMRU.indexOf(_.findWhere(tripMRU, {'tripId': tripId}));
			if (idx != -1) {
				tripMRU.splice(idx, 1);
			}
			tripMRU.push({'tripId': tripId, 'tripName': $scope.tripName});
			if (tripMRU.length > MAX_MRU_ITEMS) // max MRU items
				tripMRU.shift();
			localStorageService.add(tripMRUKey, JSON.stringify(tripMRU));

			// prepare bindable list for MRU UI
			tripMRU.reverse();
			tripMRU.splice(0, 1);
			$scope.tripMRU = tripMRU;
		});

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

		$scope.pricePattern = new RegExp("^[0-9]+(\.[0-9][0-9])?$");

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

		$scope.processCostForm = function(index, formText) {

			var convertToCost = function(formText) {

				var parsePaidBy = function(paidByText) {
					var personName = jQuery.trim(paidByText);
					addPersonIfNew(personName);
					return personName;
				}

				var newCost = {};
				newCost.title = formText.titleText;
				newCost.price = formText.priceText;
				newCost.paidBy = parsePaidBy(formText.paidByText);
				newCost.paidFor = parsePaidFor(formText.paidForText);
				return newCost;
			};

			var saveCost = function(cost, index) {
				if (index >= 0)
					$scope.costs[index] = cost;
				else
					$scope.costs.push(cost);
			};

			var newCost = convertToCost(formText);
			saveCost(newCost, index);
		};

		// TODO: once Add Cost creates a new row instead of launching the modal dialog, we can probably remove this code
		$scope.editCost = function(index, originalCost) {

			var modalInstance = $modal.open({
				templateUrl: 'static/partials/edit-cost-modal.html',
				controller: EditCostModalController,
				resolve: {
					formText: function() {
						var ft = {
								pricePattern: $scope.pricePattern,
							};

						if (originalCost) {
							ft.titleText = originalCost.title;
							ft.priceText = originalCost.price;
							ft.paidByText = originalCost.paidBy;
							ft.paidForText = $scope.printPaidFor(originalCost, true);
						}
						return ft;
					}
				}
			});

			modalInstance.result.then(function (formText) {
				$scope.processCostForm(index, formText);
			});
		};

		var addPersonIfNew = function(personName) {
			if ($scope.getEveryone().indexOf(personName) < 0)
				$scope.savePerson({ name: personName });
		}

		var parsePaidFor = function(paidForText) {
			if (!paidForText)
				return [];

			var peeps = paidForText.split(',');
			for (var i=0; i<peeps.length; ++i)
				peeps[i] = jQuery.trim(peeps[i]);
			peeps.sort();

			if (peeps.length == 1 && peeps[0].toLowerCase() == 'everyone')
				return $scope.getEveryone();

			for (var i=0; i<peeps.length; ++i)
				if (peeps[i].length > 0)
					addPersonIfNew(peeps[i]);

			return peeps;
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
