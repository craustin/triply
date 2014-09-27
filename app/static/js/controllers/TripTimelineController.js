
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

		var addDaysActivitiesToIdeas = function(day) {
			for (i=0; i<day.activities.length; ++i)
				$scope.ideas.push(day.activities[i]);
		}

		$scope.addDayAtStart = function() {
			var newDay = makeDay();
			$scope.days.unshift(newDay);
			$scope.startDate = addOffsetToDate($scope.startDate, -1);
		}

		$scope.addDayAtEnd = function() {
			var newDay = makeDay();
			$scope.days.push(newDay);
		}

		$scope.removeDayAtStart = function() {
			if ($scope.days.length <= 1)
				return;

			// add deleted day's activities to general pool
			addDaysActivitiesToIdeas($scope.days[0]);
			$scope.days.shift();
			$scope.startDate = addOffsetToDate($scope.startDate, 1);
		}

		$scope.removeDayAtEnd = function() {
			if ($scope.days.length <= 1)
				return;

			// add deleted day's activities to general pool
			addDaysActivitiesToIdeas($scope.days[$scope.days.length-1]);
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

		// ROGTODO: we should probably update both the start and end date at once -- requiring the user to change them both,
		// so that the trip doesn't all of a sudden become super long
		// or... hmm, when you slide by a day do you want the activities that are placed to slide too, so that what you were
		// doing on the first day you're still doing on the first day, or should they be sticky to whatever date they were on?
		$scope.updateStartDate = function() {

			var getDateFromYYYY_MM_DD = function(dateText) {
				// like 2014-11-29
				var year = dateText.substring(0,4);
				var month = dateText.substring(5,7);
				var day = dateText.substring(8,10);

				// JavaScript counts months from 0 to 11. January is 0. December is 11.
				return new Date(year, month-1, day);
			}

			// source: http://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
			var dateDiffInDays = function (a, b) {
				var _MS_PER_DAY = 1000 * 60 * 60 * 24;

				// Discard the time and time-zone information.
				var utc_a = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
				var utc_b = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

				return Math.floor((utc_b - utc_a) / _MS_PER_DAY);
			}

			var oldStartDate = $scope.startDate;
			var newStartDate = getDateFromYYYY_MM_DD($scope.startDateText);

			startDateDiffInDays = dateDiffInDays(oldStartDate, newStartDate);

			if (Math.abs(startDateDiffInDays) < $scope.days.length)
			{
				for (i=0; i < Math.abs(startDateDiffInDays); ++i)
				{
					if (startDateDiffInDays < 0)
						$scope.slideBackwardOneDay();
					else
						$scope.slideForwardOneDay();
				}
			}
			else
				alert('ROGTODO: handle larger day shifts!');
		}

		var makeDay = function() {
			return { activities:[], hotel:'' };
		};

		$scope.addHotel = function(dayIndex, hotel) {
			$scope.days[dayIndex]['hotel'] = hotel;
			addToEditHistory('added ' + hotel);
		}

		$scope.addActivity = function(dayIndex, activity) {
			$scope.days[dayIndex]['activities'].push(activity);
		}

		$scope.addIdea = function(idea) {
			$scope.ideas.push(idea);
		}

		$scope.dateTimeToIntuitiveShortString = function(dateTime) {
			var now = new Date();
			var diff = now.getTime() - dateTime.getTime();
			if (now.getDate() == dateTime.getDate())
				return 'Today';
			return diff;
		}

		var addToEditHistory = function(action) {
			var newEdit = { time:new Date(), action:action, user:'You' };
			$scope.edits.unshift(newEdit);
		}

		var today = new Date();
		$scope.startDate = addOffsetToDate(today, 7);
		$scope.days = [ makeDay() ];
		$scope.days[0]['activities'] = ['thing1','thing2'];
		$scope.ideas = [];
		$scope.edits = [];
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
