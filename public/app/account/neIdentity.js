angular.module("app").factory("neIdentity", function($window) {
        var currentUser;
        if(!!$window.bootstrappedUserObject) {
            currentUser = {};
            angular.extend(currentUser, $window.bootstrappedUserObject);

        }
        return {
            currentUser: currentUser,
            isAuthenticated: function() {
                return !!this.currentUser;
            }
        }
});