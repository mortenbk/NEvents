angular.module("app").controller("neNewFoodCtrl", function($modalInstance, $scope) {
    $scope.addFood = function(food) {

        $modalInstance.close(food);
        toastr.success("Saving " + food.title);
    }
    $scope.cancel = function() {
        $modalInstance.close();
    }
});