angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        var preprefix = "";
//        var preprefix = "../";  // Voir dans le service appParametersService l'utilité. Commenter en mode production
        
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