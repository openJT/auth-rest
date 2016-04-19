(function () {
    'use strict';
    angular
        .module('clients')
        .controller('ClientDialogCtrl', ClientDialogCtrl);
    function ClientDialogCtrl($mdDialog, clients) {
        var vm = this;
        vm.client = {};

        Object.assign(vm.client, clients.getClient());
        if (vm.client._id) vm.edit = true;
        else vm.edit = false;

        vm.hide = function () {
            $mdDialog.hide();
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.save = function () {
            if (vm.edit) clients.updateClient(vm.client);
            else clients.saveClient(vm.client);
            $mdDialog.hide();
        };
        vm.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
})();