(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);
    function LoginCtrl(Auth, $state) {
        var vm = this;
        vm.errors = {};
        vm.login = function (form) {
            vm.submitted = true;
            if (form.$valid) {
                Auth.login({
                    email: vm.user.email,
                    password: vm.user.password
                }).then(function () {
                    $state.go('main.clients');
                }).catch(function (err) {
                    vm.errors.other = err.message;
                });
            }
        };
    };
})()
