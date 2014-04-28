angular.module("app", ["ngResource", "ngRoute", "ui.bootstrap", 'ui.calendar']);

angular.module("app").config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when("/", {
        templateUrl: "/partials/main/main",
        controller: "neMainCtrl"
    });

    $routeProvider.when("/calendar", {
        templateUrl: "/partials/calendar/calendar",
        controller: "neCalendarCtrl"
    });

    $routeProvider.when("/location", {
        templateUrl: "/partials/location/location",
        controller: "neLocationCtrl"
    });

});