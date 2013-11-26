
var controllers = angular.module('triplyApp.controllers');

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

		$scope.getClearPerson = function() {
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
		};

		$scope.printCostTotalForPerson = function(person) {
			return Math.abs($scope.getCostTotalForPerson(person)).toFixed(2);
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
