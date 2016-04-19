(function () {
    'use strict';
    angular
        .module('app')
        .factory('Interceptor', Interceptor);
    function Interceptor($rootScope, $q, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if (window.localStorage.getItem("token")) {
                    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token");
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    if ($location.url() !== '/ng1/') $location.path('/');
                    // remove any stale tokens
                    window.localStorage.removeItem("token");
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    }
})()