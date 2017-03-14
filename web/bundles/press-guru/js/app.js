angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController'
            })
            .when('/connection', {
                templateUrl: 'bundles/press-guru/views/connection.html',
                controller: 'ConnectionController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });