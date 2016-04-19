(function () {
    'use strict';
    angular
        .module('clients')
        .component('clients', {
            templateUrl: 'ng1/clients/clients.html',
            controller: 'ClientsCtrl as ctrl',
            scope: {}
        });
})();