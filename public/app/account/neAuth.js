angular.module("app").factory("neAuth", function($http, $q, neIdentity) {
    return {
        signin: function(email, password) {
            var deferred = $q.defer();
        $http.post("/login", {email: email, password: password}).then(function(response) {
            if(response.data.success) {
                deferred.resolve(true);
                neIdentity.currentUser = response.data.user;
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    },
        signout: function() {
        var deferred = $q.defer();
        $http.post("/logout", {logout: true}).then(function() {
                deferred.resolve(true);
                neIdentity.currentUser = undefined;
        });
        return deferred.promise;
    }
}
});