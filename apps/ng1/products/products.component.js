(function () {
    'use strict';
    angular
        .module('products')
        .component('products', {
            templateUrl: 'ng1/products/products.html',
            controller: 'ProductsCtrl as ctrl',
            scope: {}
        });
})();