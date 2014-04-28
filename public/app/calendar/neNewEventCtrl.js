angular.module("app").controller("neNewEventCtrl", function ($modalInstance, $scope, date) {
    console.log("neNewEventctrl recieved this date " + date);
        $scope.event = {start: date, end: date};
    console.log("neNewEventctrls scope.event.start has this date  " + $scope.event.start);
        $scope.datepicker =
        {/*format: "dd-MMMM-yyyy",*/
            ismeridian: false
        }

        $scope.changeEndDate = function(startDate) {
            if(startDate > $scope.event.end) {
                $scope.event.end = startDate;
            }
        }

        $scope.addEvent = function(event) {
            console.log("neNewEventCtrl is returning this date " + event.start);
            $modalInstance.close(event);
            toastr.success("Saving " + event.title + " : " + event.start);
        }
        $scope.cancel = function() {
            toastr.error("Exiting modal !");
            $modalInstance.close();
        }
    });