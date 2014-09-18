angular.module("app").controller("neEditEventCtrl", function ($modalInstance, $scope, event, locations, foods) {
    $scope.event = event;
    if(!event.location) {
        $scope.event.location = {};
    }
    if(!event.orders) {
        $scope.event.orders = [];
    }
    $scope.locations = locations;
    $scope.foods = foods;


    (function fillFoodInfo(orders) {
        var indexOfElement = -1;
        for(var i = 0; i < orders.length; i++) {
            for(var j = 0; j < $scope.foods.length; j++) {
                indexOfElement = orders[i].foods.indexOf($scope.foods[j]._id);
                if(indexOfElement >= 0) {
                    orders[i].foods[indexOfElement] = $scope.foods[j];
                }
            }
        }
    })($scope.event.orders);



    $scope.datepicker =
    {/*format: "dd-MMMM-yyyy",*/
        ismeridian: false
    };

    $scope.changeEndDate = function(startDate) {
        if(startDate > $scope.event.end) {
            $scope.event.end = startDate;
        }
    }

    $scope.addOrder = function(orders) {
        var newOrder = {
            title: "New Order",
            deliveryTime: event.start
        };
        orders.push(newOrder);
    }

    $scope.addFood = function (order) {
        if (!order.foods) {
            order.foods = [foods[0]];
        } else {
            var indexOfElement = 0;
            var hasAddedValue = false;
            for (var i = 0; i < foods.length; i++) {
                if (!hasAddedValue) {
                    indexOfElement = order.foods.map(function (addedFood) {
                        return addedFood._id;
                    }).indexOf(foods[i]._id);
                    if (indexOfElement < 0) {
                        order.foods.push(foods[i]);
                        hasAddedValue = true;
                    }
                }
            }
            ;
        }
    };

    /**
     *
     * @param order Current order object being passed to the filter
     * @param indexInLoop The current $index of food in order.foods array
     * @returns {Function} Returns function that evaluates whether or not the current food item being iterated through
     *     the ng-options element, should be shown to the user. Returns true if it should be shown, otherwise false
     */
    $scope.addedFoodFilter = function(order, indexInLoop) {
        return function(item) {
            var index = order.foods.map(function(food) {
                return food._id
            }).indexOf(item._id);
            if(index == -1 || item._id == order.foods[indexInLoop]._id) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.editEvent = function(event) {
        $modalInstance.close(event);
    };
    $scope.deleteEvent = function(event) {
        $modalInstance.dismiss(event);
    };
    $scope.cancel = function() {
        $modalInstance.close();
    };
});