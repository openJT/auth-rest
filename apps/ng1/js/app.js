'use strict';
angular.module("app", ['ui.router', 'ngAnimate', 'ngResource', 'ngMaterial', 'ngAria', 'my.services'])
    .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/ng1/',
                authenticate: false,
                views: {
                    "": {
                        templateUrl: 'ng1/partials/login.html',
                        controller: 'loginCtrl as ctrl'
                    }
                }
            })
            .state('main', {
                url: '/ng1/clients/',
                authenticate: true,
                views: {
                    "header@": {
                        templateUrl: 'ng1/partials/header.html',
                        controller: 'mainCtrl as ctrl'
                    },
                    "main@": {
                        templateUrl: 'ng1/partials/main.html',
                        controller: 'mainCtrl as ctrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/ng1/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    }).factory('authInterceptor', function ($rootScope, $q, $location) {
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
                    if($location.url()!=='/ng1/')$location.path('/');
                    // remove any stale tokens
                    window.localStorage.removeItem("token");
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })
    .run(function ($rootScope, Auth) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.authenticate) {
                if (!Auth.isLoggedIn()) {
                    // If token invalid or undefined, server redirects to login.
                    Auth.getUserInfo();
                }
            }
        });
    });