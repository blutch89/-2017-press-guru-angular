angular.module('pressGuruApp')
    .controller('AddTagController', function ($scope, apiService, appParametersService, $rootScope) {
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
                    // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                    $rootScope.$broadcast("addTag");
                    
                    $scope.addTagLoading = false;
                    $scope.success = true;
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