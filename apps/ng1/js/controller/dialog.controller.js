'use strict';
angular.module("app")
    .controller('DialogCtrl', function ($mdDialog, clientStorage, rest) {
        var vm =this;
        vm.client = clientStorage.getClient();
        if (vm.client._id)vm.edit = true;
        else  vm.edit = false;

        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.save = function () {
            if (vm.edit) rest.updateClient(vm.client);
            else  rest.saveClient(vm.client);

            $mdDialog.hide();
        };

        vm.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    });