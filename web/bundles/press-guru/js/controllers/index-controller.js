angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService) {
        indexController = this;
        appParametersService.currentController = this;
        
        // Variables
        $scope.articles = {};
    
        // Variables alerte
        $scope.alertMessage = "";
        $scope.isAlertClosed = true;
        $scope.alertType = "";
    
        // Fonctions
        // Archive un article
        $scope.archiveArticle = function(articleId) {
            apiService.archiveArticle(articleId, function successCallback(response) {
                if (response.data.success == true) {
                    indexController.refreshPage();
                    $scope.createAlert("Article archivé", "success");
                } else {
                    $scope.createAlert("Impossible d'archiver l'article");
                }
            }, function errorCallback(response) {
                $scope.createAlert("Impossible d'archiver l'article");
            });
        };
    
        // Crée un message d'alerte
        $scope.createAlert = function(message, alertType) {
        	$scope.alertMessage = message;
        	$scope.isAlertClosed = false;
            $scope.alertType = alertType;
        };
    
        // Ferme le message d'alerte
        $scope.closeAlertMessage = function() {
            $scope.alertMessage = "";
        	$scope.isAlertClosed = true;
        };
        
        // Recharge la page
        this.refreshPage = function() {
            apiService.getArticles(function successCallback(response) {
                if (response.data.success == true) {
                    $scope.articles = response.data.articles;
                } else {
                    $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                }
            }, function errorCallback(response) {
                $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
            });
        };
    
        this.refreshPage();
    });