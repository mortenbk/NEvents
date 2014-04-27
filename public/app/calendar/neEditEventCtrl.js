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
        toastr.success("Saving " + event.title + " : " + event.start);
    }
    $scope.cancel = function() {
        toastr.error("Exiting modal !");
        $modalInstance.close();
    }
    });