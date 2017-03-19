angular.module('pressGuruApp')
    .service("apiService", function($http, $location, appParametersService) {
    	apiService = this;

        this.test = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "test",
            	successFunction, errorFunction);
        };




        

        // Permet d'exéuter une requête pour une API et qu'en cas de non autorisation, redirige sur la page de connexion
        this.executeRestApi = function(url, successFunction, errorFunction) {
            $http({
                method: "GET",
                url: url
            }).then(successFunction, errorFunction);
        };

        // Permet d'exéuter une requête post de formulaire
        this.executePostForm = function(url, datas, successFunction, errorFunction) {
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param(datas),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(successFunction, errorFunction);
        };
});