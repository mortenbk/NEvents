angular.module("app").controller("neEditFoodCtrl", function($modalInstance, $scope, food) {
    $scope.food = food;
    $scope.food.unBoundPriceString = food.priceString;

    $scope.editFood = function(food) {
        food.price = undefined;
        food.priceString = food.unBoundPriceString;
        delete food.unBoundPriceString;
        $modalInstance.close(food);
    };
    $scope.deleteFood = function(food) {
        $modalInstance.dismiss(food);
    };
    $scope.cancel = function() {
        $modalInstance.close();
    };

});