
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
			var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			var monthIndex = date.getMonth();
			return monthNames[monthIndex];
		}

		var getNewDateOffsetInDaysFromDate = function(date, offset) {
			var newDate = new Date(date);
			newDate.setDate(date.getDate()+offset);
			return newDate;
		}

		var dayAfter = function(date) { return getNewDateOffsetInDaysFromDate(date, 1); };
		var dayBefore = function(date) { return getNewDateOffsetInDaysFromDate(date, -1); };

		$scope.addDayAtStart = function() {
			var newDay = makeDay(dayBefore($scope.days[0].date));
			$scope.days.unshift(newDay);
		}

		$scope.removeDayAtStart = function() {
			$scope.days.shift();
		}

		$scope.addDayAtEnd = function() {
			var newDay = makeDay(dayAfter($scope.days[$scope.days.length-1].date));
			$scope.days.push(newDay);
		}

		$scope.removeDayAtEnd = function() {
			$scope.days.pop();
		}

		$scope.slideBackwardOneDay = function() {
			$scope.removeDayAtEnd();
			$scope.addDayAtStart();
		};

		$scope.slideFutureOneDay = function() {
			$scope.removeDayAtStart();
			$scope.addDayAtEnd();
		};

		var makeDay = function(date) {
			var title = getDayName(date) + ', ' + getMonthName(date) + ' ' + date.toJSON().slice(8,10);
			var activities = ['thing1','thing2'];
			return {date:date, title:title, activities:activities};
		};

		var today = new Date();
		$scope.days = [ makeDay(today) ];
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
