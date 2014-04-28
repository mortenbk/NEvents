angular.module("app").controller("neEditEventCtrl", function ($modalInstance, $scope, event) {
    $scope.event = event;
    $scope.datepicker =
    {format: "dd-MMMM-yyyy",
        ismeridian: false
    }

    /*$scope.changeEndDate = function(startDate) {
        if(startDate > $scope.event.end) {
            $scope.event.end = startDate;
        }
    }*/

    $scope.editEvent = function(event) {
        $modalInstance.close(event);
    }
    $scope.deleteEvent = function(event) {
        $modalInstance.dismiss(event);
    }
    $scope.cancel = function() {
        $modalInstance.close();
    }
    });