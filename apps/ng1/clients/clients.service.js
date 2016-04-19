(function () {
    'use strict';
    angular
        .module('clients')
        .factory('clients', clients);
    function clients($timeout, $rootScope, $state, $http, $q, socket, $mdToast) {
        var clients = [];
        var client = {};
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
            clients = data.clients;
            $rootScope.$apply();
        });
        socket.on('addClient', function (client) {
            clients.push(client);
            showSimpleToast(client.firstName + " " + client.lastName + " was added!");
        });
        socket.on('deleteClient', function (client) {
            clients.forEach(function (t, i) {
                if (t._id === client._id) {
                    showSimpleToast(client.firstName + " " + client.lastName + " was deleted!");
                    clients.splice(i, 1);
                }
            });
            showSimpleToast(client.firstName + " " + client.lastName + " was deleted!");
        });
        socket.on('updateClient', function (client) {
            clients.forEach(function (t, i) {
                if (t._id === client._id) {
                    showSimpleToast(client.firstName + " " + client.lastName + " was updated!");
                    clients[i] = client;
                }
            });
        });
        socket.on('reset', function (client) {
            $http({ url: '/client', method: 'GET' })
                .success(function (data) {
                    clients = data;
                    showSimpleToast("Data reset!");
                })
                .error(function (data, status, headers, config) { });
        });

        return {
            getClients: function () {
                return clients;
            },
            updateClient: function (item) {
                $http({ url: '/client', method: 'PUT', data: item })
                    .success(function (data) { })
                    .error(function (data, status, headers, config) { });
            },
            saveClient: function (item) {
                $http({ url: '/client', method: 'POST', data: item })
                    .success(function (data) { })
                    .error(function (data, status, headers, config) { });
            },
            deleteClient: function (item) {
                $http({ url: '/client/' + item._id, method: 'DELETE' })
                    .success(function () { })
                    .error(function (data, status, headers, config) { });
            },
            resetData: function () {
                $http({ url: '/reset', method: 'GET' })
                    .success(function () { })
                    .error(function (data, status, headers, config) { });
            },
            clearClient: function () {
                client = {};
            },
            setClient: function (item) {
                client = item;
            },
            getClient: function () {
                return client
            }
        }
    };
})()