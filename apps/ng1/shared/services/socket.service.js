(function() {
    'use strict';
    angular
        .module('app')
        .factory('socket', socket);
    function socket() {
        var socket = io('/admin', { 'query': 'token=' + window.localStorage.getItem("token") });
        return {
            get: function() {
                return socket;
            }
        }
    }
})();







