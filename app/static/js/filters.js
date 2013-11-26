'use strict';

/* Filters */

angular.module('triplyApp.filters', []).
filter('peopleFilter', function() {
	// NOTE: the filter must return objects with the same "id" as the ones in
	// the original list. if it doesn't, Angular thinks something changed and
	// gets stuck in a $digest loop
	return function(input, scope, flag_sign) {
		var filteredElements = [];
		var clearPerson = scope.getClearPerson();
		angular.forEach(input, function(person) {
			var total = scope.getCostTotalForPerson(person);
			if (!angular.equals(clearPerson, person.name) && (
				(angular.equals("+", flag_sign) && total >= 0) ||
				(angular.equals("-", flag_sign) && total < 0))) {
				filteredElements.push(person);
			}
		});
		return filteredElements;
	};
});
