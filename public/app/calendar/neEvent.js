angular.module("app").factory("neEvent", function($http, $q, $resource) {
    /*return {
        getCalendar: function() {
            console.log("getCalendar was called");
            var deferred = $q.defer();
            $http.get("/api/calendar", function(err, calendar) {
                console.log(status + " : " + calendar);
                if(status) {
                    toastr.error("Tried to access restricted resource - got caught :-(");
                } else if(calendar) {
                    console.log("getCalendar successfull " + calendar);
                    deferred.resolve(calendar);
                }
                console.log(calendar);
            });
            return deferred.promise;
        }
    }*/
    var EventResource = $resource("/api/event");
    return EventResource;
});