(function () {
    'use strict';
    angular
        .module('products')
        .controller('ProductsCtrl', ProductsCtrl);
    function ProductsCtrl($scope, $mdSidenav, products, $mdDialog, Auth) {
        var vm = this;
        vm.products = [];
        vm.details = {};
        vm.edit = false;

        $scope.$watch(function () {
            return products.getProducts();
        }, function () {
            vm.products = products.getProducts();
        }, true);
        $scope.$watch(function () {
            return products.getDetails();
        }, function () {
            vm.details = products.getDetails();
            if (vm.details.hasOwnProperty('name')) vm.edit = true;
            else vm.edit = false;
        }, true);

        vm.close = function () {
            $mdSidenav('left').close();
        };
        vm.toggle = function () {
            $mdSidenav('left').toggle();
        };
        vm.editClient = function (ev, item) {
            vm.showDialog(ev);
        };
        vm.deleteProduct = function (id) {
            products.deleteProduct(id);
        };
        vm.getProductDetails = function (id) {
            products.getProductDetails(id);
        };
        vm.addProduct = function (ev) {
            products.clearDetails();
            vm.showDialog(ev);
        };
        vm.editProduct = function (ev) {
            vm.showDialog(ev);
        };
        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'ProductsDialogCtrl as ctrl',
                templateUrl: 'ng1/products/product.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.logout = function () {
            Auth.logout();
        };
        vm.reset = function () {
            products.clearDetails();
            products.resetData();
        };
    };
})()