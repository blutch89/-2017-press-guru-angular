angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/connection', {
                templateUrl: preprefix + 'bundles/press-guru/views/connection.html',
                controller: 'ConnectionController'
            })
            .when('/registration-confirmation/:token', {
                templateUrl: preprefix + 'bundles/press-guru/views/registration-confirmation.html',
                controller: 'RegistrationConfirmationController'
            })
            .otherwise({
                redirectTo: '/connection'
            });
    }]);