/**
 * This is the callback to get the angular module used to bind to the html
 * @type {module|*|module|module|module|module}
 */
var app = angular.module("app");

/**
 * This controller handles the modal opened from the neCalendarCtrl, and returns the created event back, if it indeed has been created; to neCalendarCtrl!
 * @param $modalInstance Is a directive which controls the creation and returnvalues of the modals created by this controller
 * @param $scope Scope variable which is available to the html
 * @param date Current date, is used to fill out the empty event on creation. As well as a validation that any other date is after this date.
 * @param locations Every location in an array. These locations has been received by neCalendarCtrl, when it was created. These are used for the dropdown in the event modals.
 * @param foods Every food object in an array. This food has been received by neCalendarCtrl. And are used as a resource when adding food to orders.
 */
app.controller("neNewEventCtrl", function ($modalInstance, $scope, date, locations, foods) {
    date.setHours(12);
    $scope.event = {start: date, end: date};

    $scope.event.location = {};
    $scope.event.orders = [];

    $scope.locations = locations;
    $scope.foods = foods;

    /**
     * Datepicker options, in this case isMeridian is set to false. This object could be altered to change the format of dates or similar
     * @type {{ismeridian: boolean}}
     */
    $scope.datepicker =
    {/*format: "dd-MMMM-yyyy",*/
        ismeridian: false
    };

    /**
     * This function is bound to a ng-change directive, which will trigger whenever the user changes the end date
     *     If the user selects an invalid end date; a date which is before the start date, this function will trigger.
     * @param startDate
     */
    $scope.changeEndDate = function(startDate) {
        if(startDate > $scope.event.end) {
            $scope.event.end = startDate;
        }
    };

    /**
     * If the user wants to create a new order, this function will add an order object with dummy data, to be replaced later, to the event object.
     */
    $scope.addOrder = function() {
        var newOrder = {
            title: "New Order",
            deliveryTime: date
        };
        $scope.event.orders.push(newOrder);
    }

    /**
     * When the user wants to add food to the current order, this will trigger.
     *     This function will receive the current order and add a new array with the first element of the $scope.foods array.
     *     Otherwise the function will iterate through the $scope.foods array to determine whether or not the current order
     *     has already added each individual fooditem in the $scope.foods array.
     *     It will then add one fooditem that it does not already have. If it already has every foodoption in the $scope.foods
     *     array then the only selectable value for the user is the currently selected item.
     * @param order
     */
    $scope.addFood = function(order) {
        if(!order.foods) {
            order.foods = [$scope.foods[0]];
        } else {
            var indexOfElement = 0;
            var hasAddedValue = false;
            for(var i = 0; i < $scope.foods.length; i++) {
                if(!hasAddedValue) {
                    indexOfElement = order.foods.map(function (addedFood) {
                        return addedFood._id;
                    }).indexOf($scope.foods[i]._id);
                    if(indexOfElement < 0) {
                        order.foods.push($scope.foods[i]);
                        hasAddedValue = true;
                    }
                }
            };
        }
    }

    /**
     * If the user decides to save their changes and presses save,
     *     this function will trigger which closes the modal and returns the event created to the neCalendarCtrl to save to the backend
     * @param event The event object which has been created in the modal
     */
    $scope.addEvent = function(event) {
        console.log("neNewEventCtrl is creating this event " + angular.toJson(event, true));
        $modalInstance.close(event);
        toastr.success("Saving " + event.title + " : " + event.start);
    };

    /**
     * If the cancel button is pressed, this will close the current modal and return to neCalendarCtrl control
     */
    $scope.cancel = function() {
        toastr.error("Exiting modal !");
        $modalInstance.close();
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
});