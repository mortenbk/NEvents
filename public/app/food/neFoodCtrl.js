angular.module("app").controller("neFoodCtrl", function($scope, $modal, neFood, foodPrice) {
    $scope.foods = neFood.query();

    $scope.getPrice = function(foodObject) {
        return foodPrice.getPrice(foodObject);

    }
    $scope.setPrice = function(foodObject) {
        foodPrice.setPrice(foodObject);
    }

    $scope.editFood = function(food) {

        var modalInstance = $modal.open({
            templateUrl: '/partials/food/editFood',
            controller: "neEditFoodCtrl",
            resolve: {
                food: function () {
                    return food;
                }}
        });
        modalInstance.result.then(function(changedFood) {
            console.log("Running modalinstance result then " + angular.toJson(changedFood));
            if(changedFood && changedFood.priceString) {
                foodPrice.setPriceFromString(changedFood);
                delete changedFood.priceString;
            }
            if(changedFood && changedFood.price) {
                changedFood.$update({_id: event._id});
                toastr.success("Successfully changed " + changedFood.title);
            }
        }, function (food) {
            //Delete food
            food.$delete({_id: food._id});
            //Delete has not changed data on client,
            // need to iterate through data to reflect data on the server.
            for(var i = 0; i < $scope.foods.length; i++) {
                if($scope.foods[i]._id === food._id) {
                    $scope.foods.splice(i, 1);
                    toastr.error("Successfully deleted food");
                }
            }
        });
    }

    $scope.newFood = function () {
        var modalInstance = $modal.open({
            templateUrl: '/partials/food/newFood',
            controller: "neNewFoodCtrl"
        });
        modalInstance.result.then(function(newFood) {
            if(newFood.priceString && !newFood.price) {
                foodPrice.setPriceFromString(newFood);
                delete newFood.priceString;
            }
            if(newFood && newFood.price) {
                newFood = new neFood(newFood);
                newFood.$save(newFood);
                $scope.foods.push(newFood);
                toastr.success("Successfully added " + newFood.title);
            } else {
                toastr.error("Failed adding food with name " + newFood.title);
            }
        });

    }
});