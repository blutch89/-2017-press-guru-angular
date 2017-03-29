angular.module('pressGuruApp')
    .service("apiService", function($http, $location, appParametersService) {
    	apiService = this;
    
        // Ces flags servent à éviter de surcharger le client de requêtes AJAX de type refresh.
    	// Si la requête précédente n'est pas terminée, la suivante ne se lancera pas
    	this.refreshPagesFlags = {
    		getArticles: true,
//    		getGame: true,
    		setRequestAsCompleted: function() {
    			apiService.refreshPagesFlags.getArticles = true;
//            	apiService.refreshPagesFlags.getGame = true;
    		}
    	};
    
        this.getArticles = function(successFunction, errorFunction) {
            // Check si la précédente requête s'est terminée. Si non, quitte la fonction
        	if (! this.refreshPagesFlags.getArticles) {
        		return;
        	}

        	// Indique que la requête est en cours
        	this.refreshPagesFlags.getArticles = false;
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/all", function successCallback(response) {
                successFunction(response);
                apiService.refreshPagesFlags.setRequestAsCompleted();
            }, function errorCallback(response) {
                errorFunction(response);
                apiService.refreshPagesFlags.setRequestAsCompleted();
            });
        };
    
        this.addArticle = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/add", datas,
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