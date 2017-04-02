angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService) {
        indexController = this;
        appParametersService.currentController = this;
        
        // Variables
        $scope.articles = {};
    
        // Variables alerte
        $scope.alertMessage = "";
        $scope.isAlertClosed = true;
    
        // Fonctions
        // Crée un message d'alerte
        $scope.createAlert = function(message) {
        	$scope.alertMessage = message;
        	$scope.isAlertClosed = false;
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
                    $scope.closeAlertMessage();
                } else {
                    $scope.createAlert("Une erreur est survenue lors du chargement de la page");
                }
            }, function errorCallback(response) {
                $scope.createAlert("Une erreur est survenue lors du chargement de la page");
            });
        };
    
        this.refreshPage();
    });