angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService) {
        indexController = this;
    
        // Suppression de tous les timers
        appParametersService.intervals.clearAllPageIntervals();
        
        // Variables
        $scope.articles = {};
    
        // Fonctions
        this.refreshPage = function() {console.log($scope.articles);
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
        appParametersService.intervals.refreshArticlesPageInterval = setInterval(this.refreshPage, 2000);
    });