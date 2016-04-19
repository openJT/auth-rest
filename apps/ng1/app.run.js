(function () {
    'use strict';
    angular
        .module('app')
        .run(run);
    function run($rootScope, Auth, $window, $location) {
        $window.ga('create', 'UA-66586606-5', 'auto');

        $rootScope.$on('$stateChangeSuccess', function () {
            $window.ga('send', 'pageview', $location.path());
        });
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.authenticate) {
                if (!Auth.isLoggedIn()) {
                    // If token invalid or undefined, server redirects to login.
                    Auth.getUserInfo();
                }
            }
        });
    }
})();