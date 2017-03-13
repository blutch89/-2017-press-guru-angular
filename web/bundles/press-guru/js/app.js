angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });