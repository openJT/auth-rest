(function () {
    'use strict';
    angular
        .module('app')
        .config(Config);
    function Config($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/ng1/',
                authenticate: false,
                views: {
                    "": {
                        templateUrl: 'ng1/shared/login/login.html',
                        controller: 'LoginCtrl as ctrl'
                    }
                }
            })
            .state('main', {
                authenticate: true,
                views: {
                    "header@": {
                        templateUrl: 'ng1/shared/navigation/header.html',
                        controller: 'HeaderCtrl as ctrl'
                    }
                }
            })
            .state('main.clients', {
                url: '/ng1/clients/',
                authenticate: true,
                views: {
                    "main@": {
                        template: '<clients></clients>'
                    }
                }
            })
            .state('main.products', {
                url: '/ng1/products/',
                authenticate: true,
                views: {
                    "main@": {
                        template: '<products></products>'
                    }
                }
            });;
        $urlRouterProvider.otherwise('/ng1/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('Interceptor');
    }
})();
