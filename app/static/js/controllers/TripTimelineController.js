
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

		var dateDiffInDays = function (a, b) {
			// Discard the time and time-zone information.
			// source: http://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
			var utc_a = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
			var utc_b = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

			var diff_in_milliseconds = utc_a - utc_b;
			var MS_PER_DAY = 1000 * 60 * 60 * 24;

			return Math.round(diff_in_milliseconds / MS_PER_DAY);
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

			var oldStartDate = $scope.startDate;
			var newStartDate = getDateFromYYYY_MM_DD($scope.startDateText);

			startDateDiffInDays = dateDiffInDays(newStartDate, oldStartDate);

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

			// ROGTODO: also display a message when updating the dates directly uisng the timeline buttons
			addDateChangeToEditHistory();
		}

		var makeDay = function() {
			return { activities:[], hotel:'' };
		};

		var addDateChangeToEditHistory = function() {
			var actionMessage = 'changed the trip dates to ' + $scope.getDayTitle(0) + ' to ' + $scope.getDayTitle($scope.days.length-1);
			addToEditHistory(actionMessage);
		}

		var addIdeaToEditHistory = function(idea, dayIndex) {
			var actionMessage = 'added ' + idea;
			if (dayIndex != null)
				actionMessage += ' for ' + $scope.getDayTitle(dayIndex);

			addToEditHistory(actionMessage);
		}

		var addToEditHistory = function(actionMessage) {
			var newEdit = { time:new Date(), action:actionMessage, user:'You' };
			$scope.edits.unshift(newEdit);
		}

		$scope.addHotel = function(dayIndex, hotel) {
			$scope.days[dayIndex]['hotel'] = hotel;
			addIdeaToEditHistory(hotel, dayIndex);
		}

		$scope.addActivity = function(dayIndex, activity) {
			$scope.days[dayIndex]['activities'].push(activity);
			addIdeaToEditHistory(activity, dayIndex);
		}

		$scope.addIdea = function(idea) {
			$scope.ideas.push(idea);
			addIdeaToEditHistory(idea);
		}

		$scope.dateTimeToIntuitiveShortString = function(dateTime) {
			// http://www.w3schools.com/jsref/jsref_utc.asp
			// http://stackoverflow.com/questions/948532/how-do-you-convert-a-javascript-date-to-utc
			// http://stackoverflow.com/questions/10857272/javascript-getting-current-date-in-milliseconds-utc-no-use-of-strings

			var now = new Date();

			var diff_in_seconds = Math.round((now - dateTime) / 1000);

			if (diff_in_seconds < 0)
				return (-1*diff_in_seconds) + 'seconds in the future';

			if (diff_in_seconds < 30)
				return 'just now';

			var diff_in_minutes = Math.round(diff_in_seconds / 60);

			if (diff_in_minutes < 2)
				return 'a minute ago';


			if (diff_in_minutes < 60)
				return diff_in_minutes + ' minutes ago';

			var diff_in_days = dateDiffInDays(now, dateTime);

			if (diff_in_days < 1)
				dateTime.getHours() + ':' + dateTime.getMinutes();

			if (dayDiff == 1)
				return 'Yesterday';

			// ROGTODO: format this nicely
			return dateTime.getDate();
		}

		var today = new Date();
		$scope.startDate = addOffsetToDate(today, 7);
		$scope.days = [ makeDay() ];
		$scope.days[0]['activities'] = ['thing1','thing2'];
		$scope.ideas = [];
		$scope.edits = [];
		$scope.days.push(makeDay());
		$scope.days.push(makeDay());
	}]);

controllers.controller('NewTripTimelineController', ['$scope', '$location',
	function NewTripTimelineController($scope, $location) {

		$scope.newTripTimeline = function() {
			var randomTripId = Math.random().toString(16).substr(2);
			$location.path('timeline/' + randomTripId);
		};
	}]);
