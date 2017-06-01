angular.module('pressGuruApp')
    .controller('AddTagController', function ($scope, apiService, appParametersService) {
        addTagController = this;
    
        // Variables liées à l'ajout du tag
        $scope.addTagLoading = false;
        $scope.addTagDatas = {};
        $scope.addTagErrorMsg = "";
        $scope.success = false;
        
        // Fonction ajoutant l'étiquette
        $scope.processAddTagForm = function() {
            $scope.addTagLoading = true;
            $scope.addTagErrorMsg = "";
            
            apiService.addTag($scope.addTagDatas, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.addTagLoading = false;
                    $scope.success = true;
                    
                    // Refresh la page en cours
                    appParametersService.mainController.loadMenuItems();
                } else {
                    $scope.addTagErrorMsg = response.data.error;
                    $scope.addTagLoading = false;
                    $scope.success = false;
                }
            }, function errorCallback(response) {
                $scope.addTagErrorMsg = response.data.error;
                $scope.addTagLoading = false;
                $scope.success = false;
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.addTagDatas = {};
            $scope.addTagErrorMsg = "";
            $scope.addTagLoading = false;
            $scope.success = false;
        };
    });