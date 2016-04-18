'use strict';
angular.module("app")
    .controller('productsCtrl', function ($scope, $mdSidenav, products, $mdDialog, Auth) {
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
            vm.showEditDialog(ev);
        };
        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: 'productsDialogCtrl as ctrl',
                templateUrl: 'ng1/partials/product.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        vm.showEditDialog = function (ev) {
            $mdDialog.show({
                controller: 'productsDialogCtrl as ctrl',
                templateUrl: 'ng1/partials/product.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.save = function () {

        };
        vm.logout = function () {
            Auth.logout();
        };
        vm.reset = function () {
            products.resetData();
        };
    });