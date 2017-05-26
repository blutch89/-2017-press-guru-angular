angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../bundles/press-guru/views/connection.html',
                controller: 'ConnectionController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);