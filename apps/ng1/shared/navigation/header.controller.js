(function () {
    'use strict';
    angular
        .module('app')
        .controller('HeaderCtrl', HeaderCtrl);
    function HeaderCtrl($mdSidenav, clients, products, Auth, $rootScope, $state) {
        var vm = this;

        if ($state.current.name === 'main.clients') {
            vm.clients = ['active']; vm.products = ['inactive'];
        }
        else {
            vm.products = ['active']; vm.clients = ['inactive'];
        }

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.name === 'main.clients') {
                vm.clients = ['active']; vm.products = ['inactive'];
            }
            else {
                vm.products = ['active']; vm.clients = ['inactive'];
            }
        });

        vm.close = function () {
            $mdSidenav('left').close();
        };
        vm.toggle = function () {
            $mdSidenav('left').toggle();
        };
        vm.logout = function () {
            Auth.logout();
        };
        vm.reset = function () {
            clients.resetData();
        };
    };
})()