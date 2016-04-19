(function () {
    'use strict';
    angular
        .module('products')
        .controller('ProductsDialogCtrl', ProductsDialogCtrl);
    function ProductsDialogCtrl($scope, $mdSidenav, products, $mdDialog) {
        var vm = this;
        vm.edit = false
        vm.product = {};
        var temp = products.getDetails();
        angular.copy(temp, vm.product);

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
    };
})()