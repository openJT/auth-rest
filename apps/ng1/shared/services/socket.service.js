(function () {
    'use strict';
    angular
        .module('app')
        .factory('socket', socket);
    function socket() {
        var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token"), path: '/auth-rest/socket.io' });
        return {
            get: function () {
                return socket;
            }
        }
    }
})();







