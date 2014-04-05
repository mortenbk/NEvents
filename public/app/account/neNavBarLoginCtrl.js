angular.module("app").controller("neNavBarLoginCtrl", function($scope, neAuth, neIdentity, $location) {
    $scope.identity = neIdentity;
    $scope.signin = function(email, password) {
        neAuth.signin(email, password).then(function(success) {
            if(success) {
                toastr.success("Logged in");
            } else {
                toastr.error("Failed to login");
            }
        });
    }

    $scope.signout = function() {
        neAuth.signout().then(function() {
            toastr.error("Logged out. .. WHYYY");
            $location.path("/");
        });
    }
});