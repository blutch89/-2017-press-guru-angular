angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService) {
        indexController = this;
        appParametersService.currentController = this;
        
        // Variables
        $scope.articles = {};
    
        // Fonctions
        this.refreshPage = function() {
            apiService.getArticles(function successCallback(response) {
                if (response.data.success == true) {
                    $scope.articles = response.data.articles;
                } else {
                    // TODO
                }
            }, function errorCallback(response) {
                // TODO
            });
        };
    
        this.refreshPage();
    });