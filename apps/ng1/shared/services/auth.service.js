(function () {
    'use strict';
    angular
        .module('app')
        .factory('Auth', Auth);
    function Auth($rootScope, $http, User, $q, $location) {
        var currentUser = {};
        return {
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user) {
                var deferred = $q.defer();

                $http.post('/auth-rest/auth/local', {
                    email: user.email,
                    password: user.password
                }).success(function (data) {
                    window.localStorage.setItem('token', data.token);
                    var prom = User.get().$promise;
                    prom.then(function (data2) {
                        currentUser = data2;
                        deferred.resolve();
                    });
                }).error(function (err) {
                    this.logout();
                    deferred.reject(err);
                }.bind(this));

                return deferred.promise;
            },
            /**
             * Calls User.get(), gets redirected if no token
             *
             * @return {Boolean}
             */
            getUserInfo: function () {
                currentUser = User.get();
            },
            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                return currentUser.hasOwnProperty('role');
            },
            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                window.localStorage.removeItem("token");
                currentUser = {};
                if ($location.url() !== '/auth-rest/ng1/') window.location.assign('/');
            }
        };
    };
})()