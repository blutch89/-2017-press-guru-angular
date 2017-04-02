angular.module('pressGuruApp')
    .controller('AddArticleController', function ($scope, apiService, appParametersService) {
        addArticleController = this;
    
        // Variables liées à l'ajout d'articles
        $scope.addArticleLoading = false;
        $scope.addArticleDatas = {};
        $scope.addArticleErrorMsg = "";
        $scope.success = false;
        
        // Fonction ajoutant l'article
        $scope.processAddArticleForm = function() {
            $scope.addArticleLoading = true;
            $scope.addArticleErrorMsg = "";
            
            apiService.addArticle($scope.addArticleDatas, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.addArticleLoading = false;
                    $scope.success = true;
                    
                    // Refresh la page en cours
                    appParametersService.currentController.refreshPage();
                } else {
                    $scope.addArticleErrorMsg = response.data.error;
                    $scope.addArticleLoading = false;
                    $scope.success = false;
                }
            }, function errorCallback(response) {
                $scope.addArticleErrorMsg = response.data.error;
                $scope.addArticleLoading = false;
                $scope.success = false;
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.addArticleDatas = {};
            $scope.addArticleErrorMsg = "";
            $scope.addArticleLoading = false;
            $scope.success = false;
        };
    });