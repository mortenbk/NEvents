angular.module("app").factory("neOrder", function($http, $q, $resource) {
    var OrderResource = $resource("/api/orders/:id", {_id: "@id"}, {
            update: {
                method: "PUT", isArray: false
            }
        }
    );
    return OrderResource;
});