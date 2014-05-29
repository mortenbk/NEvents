angular.module("app").controller("neNewEventCtrl", function ($modalInstance, $scope, date, locations) {
        $scope.event = {start: date, end: date};
        if(!$scope.event.location) {
            $scope.event.location = {};
        }
        $scope.locations = locations;

        $scope.datepicker =
        {/*format: "dd-MMMM-yyyy",*/
            ismeridian: false
        };

        $scope.changeEndDate = function(startDate) {
            if(startDate > $scope.event.end) {
                $scope.event.end = startDate;
            }
        };

        $scope.addEvent = function(event) {
            console.log("neNewEventCtrl is returning this date " + event.start);
            $modalInstance.close(event);
            toastr.success("Saving " + event.title + " : " + event.start);
        };
        $scope.cancel = function() {
            toastr.error("Exiting modal !");
            $modalInstance.close();
        };
    });