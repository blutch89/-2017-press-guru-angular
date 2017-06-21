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
    }])
    .run(function($rootScope) {
        // Définit une première fois la taille de l'écran dans des variables du rootScope
        $rootScope.screenWidth = window.innerWidth;
        $rootScope.screenHeight = window.innerHeight;
    
        // Quand la fenêtre se resize, note sa taille dans le rootScope
        $(window).resize(function() {
            $rootScope.$apply(function() {
                $rootScope.screenWidth = window.innerWidth;
                $rootScope.screenHeight = window.innerHeight;
            });
        });
    
        // Fonction indiquant si l'écran est de type extra small -> width = <768px
        $rootScope.isMobileDevice = function() {
            return ($rootScope.screenWidth < 768) ? true : false;
        };
    });

