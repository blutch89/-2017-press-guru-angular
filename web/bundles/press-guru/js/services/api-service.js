angular.module('pressGuruApp')
    .service("apiService", function($http, $location, appParametersService) {
    	apiService = this;
    
        // Demande la liste des éléments du menu latéral
        this.getMenuItems = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "architecture/get-menu-items", successFunction, errorFunction);
        };
    
        // Demande tous les articles
        this.getArticles = function(sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/all" + toAddInUrl, successFunction, errorFunction);
        };
    
        // Demande les articles d'une étiquette
        this.getArticlesFromTag = function(tagId, sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/" + tagId + toAddInUrl, successFunction, errorFunction);
        };
    
        // Demande les articles archivés
        this.getArchivedArticles = function(sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/archived" + toAddInUrl, successFunction, errorFunction);
        };
    
        // Ajout un article
        this.addArticle = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/add", datas,
            	successFunction, errorFunction);
        };
    
        // Archive un article
        this.archiveArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/archive/" + articleId, successFunction, errorFunction);
        };
        
        // Charge les infos de base pour la fenêtre de modification des étiquettes d'un article
        this.loadLabelsDialogDatas = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/load-labels-dialog-datas/" + articleId, successFunction, errorFunction);
        };
    
        // Modifie les étiquettes d'un article
        this.editArticleLabels = function(articleId, articleLabels, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/edit-labels", {"article-id": articleId, "article-labels": articleLabels}, successFunction, errorFunction);
        };
        
        // Supprime un article
        this.removeArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/delete/" + articleId, successFunction, errorFunction);
        };
    
        // Ajout d'une étiquette
        this.addTag = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "tags/add", datas,
            	successFunction, errorFunction);
        };
    
        this.getTags = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "tags/get/all",
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
    
    
        // Autres méthodes helper
        this.calculateSortParametersUrl = function(sortParams) {
            if (sortParams["sortBy"] !== undefined) {
                return "?sortBy=" + sortParams["sortBy"] + "&sortDirection=" + sortParams["sortDirection"];
            }
            
            return "";
        };
});