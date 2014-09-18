/**
 * This is the neNewEventCtrl, this controller controls the whole process of creating an event.
 *     It delegates each subpart to other controllers through modals, and they return the data to this controller.
 *     Which then processes the return data and contacts the backend to reflect the changes made by the user(if needed).
 */
angular.module("app").controller("neCalendarCtrl", function($scope, $modal, $compile, neEvent, neLocation, calendarConfig, neFood, neOrder) {

    $scope.events = neEvent.query();
    $scope.eventSources = [$scope.events];

    $scope.uiConfig = calendarConfig.config($scope);

    var locations = neLocation.query();
    var foods = neFood.query();

    $scope.newEvent = function (date) {
        var modalInstance = $modal.open({
            templateUrl: '/partials/calendar/newEvent',
            controller: "neNewEventCtrl",
            resolve: {
            date: function () {
                return date;
             },
            locations: function() {
                return locations;
            },
            foods: function() {
                return foods;
            }}
        });
        modalInstance.result.then(function(newEvent) {
            if(newEvent) {
                newEvent.location = newEvent.location._id;
                newEvent.orders.forEach(function(currentOrder) {
                    for(var i = 0; i < currentOrder.foods.length; i++) {
                        currentOrder.foods[i] =  currentOrder.foods[i]._id;
                    }
                });

                newEvent = new neEvent(newEvent);
                newEvent.$save(newEvent);
                $scope.events.push(newEvent);
                toastr.success("Successfully added " + newEvent.title);
            }
        });

    };

    $scope.editEvent = function (event) {
        var modalInstance = $modal.open({
            templateUrl: '/partials/calendar/editEvent',
            controller: "neEditEventCtrl",
            resolve: {
                event: function () {
                    return event;
                },
                locations: function() {
                    return locations;
                },
                foods: function() {
                    return foods;
                }}
        });
        modalInstance.result.then(function(changedEvent) {
            if(changedEvent) {
                //Source property needs to be deleted to prevent circular reference error
                delete changedEvent.source;
                changedEvent.location = changedEvent.location._id;

                changedEvent.orders.forEach(function(currentOrder) {
                    for(var i = 0; i < currentOrder.foods.length; i++) {
                        currentOrder.foods[i] =  currentOrder.foods[i]._id;
                    }
                });
                changedEvent.$update({_id: event._id});
                toastr.success("Successfully changed " + changedEvent.title);
            }
        }, function (event) {
            if(event != "backdrop click") {
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
            }

        });

    }
});