'use strict';
angular.module("app")
    .controller('productsDialogCtrl', function ($scope, $mdSidenav, products, $mdDialog) {
        var vm = this;
        vm.edit = false
        vm.product = {};
        var temp = products.getDetails();
        angular.copy(temp, vm.product);
        // vm.product = products.getDetails();
        if (vm.product.hasOwnProperty('name')) vm.edit = true;
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.save = function () {
            if (vm.edit) products.updateProduct(vm.product);
            else products.addProduct(vm.product);
            $mdDialog.cancel();
            products.clearDetails();
        };
        vm.reset = function () {
            products.resetData();
        };
    });