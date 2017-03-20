angular.module('pressGuruApp')
    .factory('httpResponseInterceptor', ['$location', 'appParametersService', function ($location, appParametersService) {
        return {
            response: function (response) {
                if (response.data.success) {
                    appParametersService.isConnected = true;
                }
                
                return response;
            },
            
            responseError: function (response) {
                // S'il y a une erreur 401 (non autorisé), redirige l'utilisateur sur la page de connexion
                if (response.status === 401) {
                    appParametersService.isConnected = false;
                    $location.path('/connection');
                } else if (response.data.success) {
                    appParametersService.isConnected = true;
                }
                
                return response;
            }
        };
    }])