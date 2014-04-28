angular.module("app").factory("neLocation", function($http, $q, $resource) {
    var LocationResource = $resource("/api/locations/:id", {_id: "@id"}, {
            update: {
                method: "PUT", isArray: false
            }
        }
    );
    return LocationResource;
});