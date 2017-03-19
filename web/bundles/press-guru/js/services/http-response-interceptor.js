angular.module('pressGuruApp')
    .factory('httpResponseInterceptor', ['$location', 'appParametersService', function ($location, appParametersService) {
        return {
            responseError: function (response) {
                // S'il y a une erreur 401 (non autorisé), redirige l'utilisateur sur la page de connexion
                if (response.status === 401) {
//                    authentificationService.isConnected = false;
                    $location.path('/connection');
                    return response;
                } else {
//                    authentificationService.isConnected = true;
                    return response; 
                }
            }
        };
    }])