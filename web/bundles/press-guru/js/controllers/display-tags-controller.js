angular.module('pressGuruApp')
    .controller('DisplayTagsController', function ($scope, apiService, appParametersService, $location) {
        var displayTagsController = this;
        appParametersService.displayTagsDialogController = this;
        
        // Variables fenêtre des étiquettes
        $scope.displayTagsLoading = true;
        $scope.tags = {};
        $scope.displayTagsErrorMsg = "";
        $scope.currentEditedTag = 0;
        
    
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
    
        // Appelle loadDatas
        $scope.loadDatas = function() {
            displayTagsController.loadDatas();
        };
    
        // Redirige l'utilisateur sur le tag sélectionné et ferme le dialog
        $scope.selectTag = function(tagId) {
            $location.path("/articles/tag/" + tagId);
            $("#display-tag").modal("hide");
        };
    
        // Définit quelle étiquette est en train d'être modifiée
        $scope.setCurrentEditedTag = function(tagId) {
            $scope.currentEditedTag = tagId;
        };
    
        // Est-ce que l'étiquette en paramètre est celle qui est en train d'être modifiée ?
        $scope.isTagIsCurrentlyEdited = function(tagId) {
            if ($scope.currentEditedTag == tagId) {
                return true;
            }
            
            return false;
        };
    
        $scope.resetCurrentEditedTag = function() {
            $scope.currentEditedTag = 0;
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.tags = {};
            $scope.editLabelsErrorMsg = "";
            $scope.editLabelsLoading = false;
            $scope.currentEditedTag = 0;
        };
    });