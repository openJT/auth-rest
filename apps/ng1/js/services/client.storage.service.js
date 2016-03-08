/**
 * Created by Joce on 01/03/2016.
 */
'use strict';
angular.module('my.services')
    .factory('clientStorage', function () {
        var client = {};

        return {
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
    });
