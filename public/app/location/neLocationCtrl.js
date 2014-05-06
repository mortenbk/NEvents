angular.module("app").controller("neLocationCtrl", function($scope, neLocation, $modal) {
    $scope.locations = neLocation.query();

    $scope.editLocation = function(location) {

            var modalInstance = $modal.open({
                templateUrl: '/partials/location/editLocation',
                controller: "neEditLocationCtrl",
                resolve: {
                    location: function () {
                        return location;
                    }}
            });
            modalInstance.result.then(function(changedLocation) {
                if(changedLocation) {
                    changedLocation.$update({_id: event._id});
                    toastr.success("Successfully changed " + changedLocation.title);
                }
            }, function (location) {
                //Delete location
                location.$delete({_id: location._id});
                //Delete has not changed data on client,
                // need to iterate through data to reflect data on the server.
                for(var i = 0; i < $scope.locations.length; i++) {
                    if($scope.locations[i]._id === location._id) {
                        $scope.locations.splice(i, 1);
                        toastr.error("Successfully deleted location");
                    }
                }
            });
    };

    $scope.newLocation = function () {
        var modalInstance = $modal.open({
            templateUrl: '/partials/location/newLocation',
            controller: "neNewLocationCtrl"
        });
        modalInstance.result.then(function(newLocation) {
            if(newLocation) {
                newLocation = new neLocation(newLocation);
                newLocation.$save(newLocation);
                $scope.locations.push(newLocation);
                toastr.success("Successfully added " + newLocation.title);
            }
        });

    }
});

