
var controllers = angular.module('triplyApp.controllers');

controllers.controller('TripTimelineController', ['$scope', '$routeParams', 'angularFire',
	function TripTimelineController($scope, $routeParams, angularFire) {

		var tripId = $routeParams.tripId;

		var urlTripName = new Firebase('https://triply.firebaseio.com/timeline/' + tripId + '/tripName');
		$scope.tripName = '';
		angularFire(urlTripName, $scope, 'tripName');

		var getDayName = function(date) {
			var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var dayIndex = date.getDay();
			return dayNames[dayIndex];
		}

		var getMonthName = function(date) {
			var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'];
			var monthIndex = date.getMonth();
			return monthNames[monthIndex];
		}

		var addOffsetToDate = function(date, offset) {
			var newDate = new Date(date);
			newDate.setDate(date.getDate()+offset);
			return newDate;
		}

		$scope.addDayAtStart = function() {
			var newDay = makeDay();
			$scope.days.unshift(newDay);
		}

		$scope.removeDayAtStart = function() {
			if ($scope.days.length > 1)
				$scope.days.shift();
		}

		$scope.addDayAtEnd = function() {
			var newDay = makeDay();
			$scope.days.push(newDay);
		}

		$scope.removeDayAtEnd = function() {
			if ($scope.days.length > 1)
				$scope.days.pop();
		}

		$scope.slideBackwardOneDay = function() {
			$scope.addDayAtStart();
			$scope.removeDayAtEnd();
		};

		$scope.slideForwardOneDay = function() {
			$scope.addDayAtEnd();
			$scope.removeDayAtStart();
		};

		$scope.dateToString = function(date) {
			return getDayName(date) + ', ' + getMonthName(date) + ' ' + date.toJSON().slice(8,10);
		}

		$scope.getDayTitle = function(index) {
			var title = '';
			if ($scope.startDate == null)
				title = 'Day ' + (index + 1);
			else
				title = $scope.dateToString(addOffsetToDate($scope.startDate, index));

			return title;
		}

		$scope.updateStartingDate = function() {
			alert('TODO: be able to parse text like \'' + $scope.startDateText + '\' into a date');
			// and then update the starting date
		}		

		var makeDay = function() {
			return {activities:[]};
		};

		var today = new Date();
		$scope.startDate = addOffsetToDate(today, 7);
		$scope.days = [ makeDay() ];
		$scope.days[0]['activities'] = ['thing1','thing2'];
		$scope.addDayAtEnd();
		$scope.addDayAtEnd();
	}]);

controllers.controller('NewTripTimelineController', ['$scope', '$location',
	function NewTripTimelineController($scope, $location) {

		$scope.newTripTimeline = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('timeline/' + randomTripId);
		};
	}]);
