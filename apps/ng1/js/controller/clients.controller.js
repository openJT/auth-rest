'use strict';
angular.module("app")
    .controller('clientsCtrl', function ($scope, $mdSidenav, clients, products, clientStorage, $mdDialog, Auth) {
        var vm = this;
        vm.client = [];

        $scope.$watch(function () {
            return clients.getClients();
        }, function () {
            vm.clients = clients.getClients();
        }, true);

        vm.close = function () {
            $mdSidenav('left').close();
        };
        vm.toggle = function () {
            $mdSidenav('left').toggle();
        };
        vm.editClient = function (ev, item) {
            clientStorage.setClient(item);
            vm.showDialog(ev);
        };
        vm.deleteClient = function (item) {
            clients.deleteClient(item);
        };
        vm.addClient = function (ev) {
            clientStorage.clearClient();
            vm.showDialog(ev);
        };
        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'DialogCtrl as ctrl',
                templateUrl: 'ng1/partials/clients.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        vm.logout = function () {
            Auth.logout();
        };
        vm.reset = function () {
            clients.resetData();
        };
    });