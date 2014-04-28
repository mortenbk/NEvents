angular.module("app").controller("neFoodCtrl", function($scope, $modal, neFood, $window) {
    $scope.foods = neFood.query();
    $window.foods = $scope.foods;
});