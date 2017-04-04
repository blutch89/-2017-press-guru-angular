angular.module('pressGuruApp')
    .controller('EditArticleLabelsController', function ($scope, apiService, appParametersService) {
        var editArticleLabelsController = this;
        appParametersService.editLabelsDialogController = this;
    
        // Variables liées à l'ajout d'articles
//        $scope.addArticleLoading = false;
//        $scope.addArticleDatas = {};
//        $scope.addArticleErrorMsg = "";
//        $scope.success = false;
        
        // Variables labels Dialog
        $scope.articleLabels = {};       // Liste des étiquettes de l'article en cours
        $scope.allLabels = {};           // Liste de toutes les étiquettes
    
        // Charge les informations du dialog (tous les labels ainsi que les labels de l'article)
        this.loadLabelsDialogDatas = function(articleId) {
            apiService.loadLabelsDialogDatas(articleId, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.articleLabels = response.data["article-labels"];
                    $scope.allLabels = response.data["all-labels"];
                } else {
//                    $scope.createAlert("Impossible de charges les informations de l'article", "danger");
                }
            }, function errorCallback(response) {
//                $scope.createAlert("Impossible de charges les informations de l'article", "danger");
            });
        };
    });