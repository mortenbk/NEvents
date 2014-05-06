angular.module("app").controller("neNewLocationCtrl", function($modalInstance, $scope) {
    $scope.location = {isRoom: true};

    $scope.addLocation = function(location) {

        $modalInstance.close(location);
        toastr.success("Saving " + location.title);
    };
    $scope.cancel = function() {
        $modalInstance.close();
    };
});