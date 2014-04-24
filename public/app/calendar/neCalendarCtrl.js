angular.module("app").controller("neCalendarCtrl", function($scope, $modal, $window) {
    $scope.newEvent = function (src) {

        if(src) {
            var theElement = $(src.target);
        }

        //If dblclick event was on element from the past, it will not run
        if(!theElement || theElement.hasClass("fc-today") || theElement.hasClass("fc-future")) {

        var modalInstance = $modal.open({
            templateUrl: '/partials/calendar/newEvent',
            controller: function ($modalInstance, $scope, date) {
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
                    toastr.success("Saving " + event.title + " : " + event.start);
                    modalInstance.close();
                }
                $scope.cancel = function() {
                    toastr.error("Exiting modal !");
                    modalInstance.close();
                }
            },
            resolve: {
                date: function () {
                    return $scope.date;
                }
            }
        });
        }
    }
});