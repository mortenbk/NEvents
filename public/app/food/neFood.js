angular.module("app").factory("neFood", function($http, $q, $resource) {
    var FoodResource = $resource("/api/foods/:id", {_id: "@id"}, {
            update: {
                method: "PUT", isArray: false
            }
        }
    );
    return FoodResource;
});