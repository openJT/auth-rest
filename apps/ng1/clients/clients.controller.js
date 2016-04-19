(function () {
    'use strict';
    angular
        .module('clients')
        .controller('ClientsCtrl', ClientsCtrl);
    function ClientsCtrl($scope, $mdSidenav, clients, products, $mdDialog, Auth) {
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
            clients.setClient(item);
            vm.showDialog(ev);
        };
        vm.deleteClient = function (item) {
            clients.deleteClient(item);
        };
        vm.addClient = function (ev) {
            clients.clearClient();
            vm.showDialog(ev);
        };
        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'ClientDialogCtrl as ctrl',
                templateUrl: 'ng1/clients/clients.dialog.html',
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
    };
})();