angular.module('pressGuruApp')
    .factory('httpResponseInterceptor', ['appParametersService', '$window', function (appParametersService, $window) {
        return {
            responseError: function (response) {
                // S'il y a une erreur 401 (non autorisé), redirige l'utilisateur sur la page de connexion
                if (response.status === 401) {
                    $window.location.href = appParametersService.paths.prefix + "authentication#!/connection";
                }
                
                return response;
            }
        };
    }])