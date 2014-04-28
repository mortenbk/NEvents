angular.module("app").controller("neEditLocationCtrl", function($modalInstance, $scope, location) {
    $scope.location = location;

    $scope.editLocation = function(location) {
        $modalInstance.close(location);
    }
    $scope.deleteLocation = function(location) {
        $modalInstance.dismiss(location);
    }
    $scope.cancel = function() {
        $modalInstance.close();
    }

});