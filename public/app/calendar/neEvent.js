angular.module("app").factory("neEvent", function($http, $q, $resource) {
    var EventResource = $resource("/api/events/:id", {_id: "@id"}, {
        update: {
        method: "PUT", isArray: false
        }
    }
    );
    return EventResource;
});