angular.module('pressGuruApp')
    .controller('DisplayTagsController', function ($scope, apiService, appParametersService) {
        var displayTagsController = this;
        appParametersService.displayTagsDialogController = this;
        
        // Variables labels Dialog
        $scope.displayTagsLoading = true;
        $scope.tags = {};
        $scope.displayTagsErrorMsg = "";
    
    
        
    
        // Charge les informations du dialog (toutes les étiquettes)
        this.loadDatas = function() {
            $scope.displayTagsLoading = true;
            $scope.displayTagsErrorMsg = "";
            
            apiService.getTags(function successCallback(response) {
                if (response.data.success == true) {
                    $scope.tags = response.data["tags"];
                    
                    $scope.displayTagsLoading = false;
                } else {
                    $scope.displayTagsLoading = false;
                    $scope.displayTagsErrorMsg = response.data.error
                }
            }, function errorCallback(response) {
                $scope.displayTagsLoading = false;
                $scope.displayTagsErrorMsg = "Impossible de charger les informations de l'article";
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.tags = {};
            $scope.editLabelsErrorMsg = "";
            $scope.editLabelsLoading = false;
        };
    });