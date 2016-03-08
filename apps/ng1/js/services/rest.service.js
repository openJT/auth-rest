'use strict';
angular.module('my.services')
    .factory('rest', function ($timeout, $rootScope, $state, $http, $q) {
        var clients = [];
        $http({url: '/client', method: 'GET'})
            .success(function (data) {
                clients = data;
            })
            .error(function (data, status, headers, config) {

            });
        function updateClients() {
            $http({url: '/client', method: 'GET'})
                .success(function (data) {
                    clients = data;
                })
                .error(function (data, status, headers, config) {

                });
        }
        return {
            getClients: function () {
                return clients;
            },
            updateClient: function (item) {
                $http({url: '/client', method: 'PUT', data: item})
                    .success(function (data) {
                    })
                    .error(function (data, status, headers, config) {

                    });
            },
            saveClient: function (item) {
                $http({url: '/client', method: 'POST', data: item})
                    .success(function (data) {
                        updateClients();
                    })
                    .error(function (data, status, headers, config) {

                    });
            },
            deleteClient: function (item) {
                $http({url: '/client/' + item._id, method: 'DELETE'})
                    .success(function () {
                        updateClients();
                    })
                    .error(function (data, status, headers, config) {

                    });
            },
            resetData:function(){
                $http({url: '/reset', method: 'GET'})
                    .success(function () {
                        updateClients();
                    })
                    .error(function (data, status, headers, config) {

                    });
            }
        }
    });