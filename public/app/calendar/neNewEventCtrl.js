angular.module("app").controller("neNewEventCtrl", function ($modalInstance, $scope, date) {
        $scope.event = {start: date, end: date};
        $scope.datepicker =
        {format: "dd-MMMM-yyyy",
            ismeridian: false
        }

        $scope.changeEndDate = function(startDate) {
            if(startDate > $scope.event.end) {
                $scope.event.end = startDate;
            }
        }

        $scope.addEvent = function(event) {
            $modalInstance.close(event);
            toastr.success("Saving " + event.title + " : " + event.start);
        }
        $scope.cancel = function() {
            toastr.error("Exiting modal !");
            $modalInstance.close();
        }
    });