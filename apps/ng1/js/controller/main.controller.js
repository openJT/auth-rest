'use strict';
angular.module("app")
    .controller('mainCtrl', function ($scope, $mdSidenav, rest, $mdDialog, Auth, clientStorage) {
        var vm = this;
        
        $scope.$watch(function () {
            return rest.getClients();
        }, function () {
            vm.clients = rest.getClients();
        }, true);

        vm.close = function () {
            $mdSidenav('left').close();
        };
        vm.toggle = function () {
            $mdSidenav('left').toggle();
        };
        vm.client = [];
        vm.editClient = function (ev, item) {
            clientStorage.setClient(item);
            vm.showDialog(ev);

        };
        vm.deleteClient = function (item) {
            rest.deleteClient(item);
        };
        vm.addClient = function (ev) {
            clientStorage.clearClient();
            vm.showDialog(ev);
        };
        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'DialogCtrl as ctrl',
                templateUrl: 'ng1/partials/dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        vm.logout = function () {
            Auth.logout();
        };
        vm.reset = function () {
            rest.resetData();
        };
    });