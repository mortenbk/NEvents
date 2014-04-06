angular.module("app").controller("neCalendarCtrl", function($scope, neCalendar) {
    neCalendar.getCalendar().then(function(calendar) {
        console.log("Calendar ? = " + calendar);
        $scope.calendar = calendar;
    });
});