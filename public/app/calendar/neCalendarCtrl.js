angular.module("app").controller("neCalendarCtrl", function($scope, $modal, $compile, neEvent, calendarConfig) {

    $scope.events = neEvent.query();
    $scope.eventSources = [$scope.events];

    $scope.uiConfig = calendarConfig.config($scope);

    $scope.newEvent = function (date) {
        console.log("Sending this date from controller " + date);
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
                console.log("NewEvent 1 : " + angular.toJson(newEvent));
                newEvent = new neEvent(newEvent);
                console.log("NewEvent 2 : " + angular.toJson(newEvent));
                newEvent.$save(newEvent);

                console.log("NewEvent 3 : " + angular.toJson(newEvent));
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
            if(changedEvent) {
                changedEvent.$update({_id: event._id});
                toastr.success("Successfully changed " + changedEvent.title);
            }
        }, function (event) {
            //Delete event
            event.$delete({_id: event._id});
            //Delete has not changed data on client,
            // need to iterate through data to reflect data on the server.
            for(var i = 0; i < $scope.events.length; i++) {
                if($scope.events[i]._id === event._id) {
                    $scope.events.splice(i, 1);
                    toastr.error("Successfully deleted event");
                }
            }

        });

    }
});