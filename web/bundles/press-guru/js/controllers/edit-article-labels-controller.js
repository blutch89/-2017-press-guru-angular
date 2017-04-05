angular.module('pressGuruApp')
    .controller('EditArticleLabelsController', function ($scope, apiService, appParametersService) {
        var editArticleLabelsController = this;
        appParametersService.editLabelsDialogController = this;
        
        // Variables labels Dialog
        $scope.articleId = null;
        $scope.editLabelsLoading = true;
        $scope.articleLabels = {};       // Liste des étiquettes de l'article en cours
        $scope.allLabels = {};           // Liste de toutes les étiquettes
        $scope.editLabelsErrorMsg = "";
        $scope.success = false;
    
        // Charge les informations du dialog (tous les labels ainsi que les labels de l'article)
        this.loadLabelsDialogDatas = function(articleId) {
            $scope.articleId = articleId;
            $scope.editLabelsLoading = true;
            $scope.editLabelsErrorMsg = "";
            
            apiService.loadLabelsDialogDatas(articleId, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.articleLabels = response.data["article-labels"];
                    $scope.allLabels = response.data["all-labels"];
                    
                    $scope.editLabelsLoading = false;
                } else {
                    $scope.editLabelsLoading = false;
                    $scope.editLabelsErrorMsg = response.data.error
                }
            }, function errorCallback(response) {
                $scope.editLabelsLoading = false;
                $scope.editLabelsErrorMsg = "Impossible de charger les informations de l'article";
            });
        };
    
        // Modifie l'article en fonction des labels choisis
        $scope.processEditLabels = function() {
            $scope.editLabelsLoading = true;
            $scope.editLabelsErrorMsg = "";
            
            apiService.editArticleLabels($scope.articleId, $scope.articleLabels, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.success = true;
                    $scope.editLabelsLoading = false;
                } else {
                    $scope.editLabelsLoading = false;
                    $scope.editLabelsErrorMsg = response.data.error
                }
            }, function errorCallback(response) {
                $scope.editLabelsLoading = false;
                $scope.editLabelsErrorMsg = "Impossible de charger les informations de l'article";
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.articleLabels = {};
            $scope.allLabels = {};
            $scope.editLabelsErrorMsg = "";
            $scope.editLabelsLoading = false;
            $scope.success = false;
        };
    });