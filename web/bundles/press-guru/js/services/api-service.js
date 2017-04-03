angular.module('pressGuruApp')
    .service("apiService", function($http, $location, appParametersService) {
    	apiService = this;
    
        this.getArticles = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/get/all", successFunction, errorFunction);
        };
    
        this.addArticle = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/add", datas,
            	successFunction, errorFunction);
        };
    
        this.archiveArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/archive/" + articleId, successFunction, errorFunction);
        }
        
        this.removeArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/delete/" + articleId, successFunction, errorFunction);
        }
    
        




        

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