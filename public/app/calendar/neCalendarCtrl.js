angular.module("app").controller("neCalendarCtrl", function($scope, $modal, $compile, neEvent, calendarConfig) {

    $scope.events = neEvent.query();
    $scope.eventSources = [$scope.events];

    $scope.uiConfig = calendarConfig.config($scope);

    $scope.newEvent = function (date) {
        var modalInstance = $modal.open({
            templateUrl: '/partials/calendar/newEvent',
            controller: "neNewEventCtrl",
            resolve: {
            date: function () {
                return date;
             }}
        });
        modalInstance.result.then(function(newEvent) {
            if(newEvent) {
                $scope.events.push(newEvent);
                console.log("Added : " + angular.toJson(newEvent));
            }
        });

    }

    $scope.editEvent = function (event) {
        var modalInstance = $modal.open({
            templateUrl: '/partials/calendar/editEvent',
            controller: "neEditEventCtrl",
            resolve: {
                event: function () {
                    return event;
                }}
        });
        modalInstance.result.then(function(changedEvent) {
            event.$update({_id: event._id});
            if(changedEvent) {
                event = changedEvent;
                console.log("Added : " + angular.toJson(changedEvent));
            }
        });

    }
});