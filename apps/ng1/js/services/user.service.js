'use strict';
angular.module('my.services')
    .factory('User', function ($resource) {
        return $resource('/api/users/:id/:controller', {
                id: '@_id'
            },
            {
                changePassword: {
                    method: 'PUT',
                    params: {
                        controller: 'password'
                    }
                },
                get: {
                    method: 'GET',
                    params: {
                        id: 'me'
                    }
                },
                applySettings: {
                    method: 'PUT',
                    params: {
                        controller: 'settings'
                    }
                }
            });
    });