angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .when('/articles/tag/:tagId', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .when('/articles/archived', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('httpResponseInterceptor');
    }]);

