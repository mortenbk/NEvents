angular.module("app").factory("neCalendar", function($http, $q) {
    return {
        getCalendar: function() {
            console.log("getCalendar was called");
            var deferred = $q.defer();
            $http.get("/calendar", function(err, calendar) {
                if(err) {
                    toastr.error("Tried to access restricted resource - got caught :-(");
                } else if(calendar) {
                    deferred.resolve(true, calendar);
                }
            });
            return deferred.promise;
        }
    }
});