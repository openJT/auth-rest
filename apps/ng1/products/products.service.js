(function () {
    'use strict';
    angular
        .module('products')
        .factory('products', products);

    function products($timeout, $rootScope, $state, $http, $q, socket, $mdToast) {
        var products = [];
        var details = {};
        var socket = socket.get();
        var showSimpleToast = function (msg) {
            $mdToast.show(
                $mdToast.simple()
                    .position("bottom right")
                    .textContent(msg)
                    .hideDelay(2000)
            );
        };

        socket.on('init', function (data) {
            products = data.products;
        });
        socket.on('addProduct', function (product) {
            products.push(product);
            showSimpleToast(product.name + " added!");
        });
        socket.on('deleteProduct', function (product) {
            products.forEach(function (t, i) {
                if (t._id === product._id) {
                    showSimpleToast(product.name + " deleted!");
                    if (details._id === product._id) details = {};
                    products.splice(i, 1);
                }
            });
            showSimpleToast(product.name + " deleted!");
        });
        socket.on('updateProduct', function (product) {
            products.forEach(function (t, i) {
                if (t._id === product._id) {
                    showSimpleToast(product.name + " updated!");
                    products[i] = product;
                }
            });
        });
        socket.on('reset', function (client) {
            $http({ url: '/auth-rest/product', method: 'GET' })
                .success(function (data) {
                    products = data;
                })
                .error(function (data, status, headers, config) { });
        });
        
        return {
            getProducts: function () {
                return products;
            },
            getDetails: function () {
                return details;
            },
            clearDetails: function () {
                details = {};
            },
            updateProduct: function (item) {
                $http({ url: '/auth-rest/product', method: 'PUT', data: item })
                    .success(function (data) { })
                    .error(function (data, status, headers, config) { });
            },
            addProduct: function (item) {
                $http({ url: '/auth-rest/product', method: 'POST', data: item })
                    .success(function (data) { })
                    .error(function (data, status, headers, config) { });
            },
            deleteProduct: function (id) {
                $http({ url: '/auth-rest/product/' + id, method: 'DELETE' })
                    .success(function () { })
                    .error(function (data, status, headers, config) { });
            },
            getProductDetails: function (id) {
                $http({ url: '/auth-rest/product/' + id, method: 'GET' })
                    .success(function (data) {
                        details = data;
                    })
                    .error(function (data, status, headers, config) { });
            },
            resetData: function () {
                $http({ url: '/auth-rest/reset', method: 'GET' })
                    .success(function () { })
                    .error(function (data, status, headers, config) { });
            }
        }
    };
})()