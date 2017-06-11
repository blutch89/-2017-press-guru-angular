angular.module('pressGuruApp')
    .controller('DisplayTagsController', function ($scope, apiService, appParametersService, $location) {
        var displayTagsController = this;
        appParametersService.displayTagsDialogController = this;
        
        // Variables fenêtre des étiquettes
        $scope.displayTagsLoading = true;
        $scope.tags = {};
        $scope.displayTagsErrorMsg = "";
    
        // Variables modification du titre d'une étiquette
        $scope.currentEditedTag = 0;
        $scope.editTagNewNames = [];    // Il y a un bug si tous les input (tag in tags) référencent la même variable. Alors j'utilise un array
        $scope.editTagLoading = false;
        $scope.editTagErrorMsg = "";
        
    
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
    
        // Redirige l'utilisateur sur le tag sélectionné et ferme le dialog
        $scope.selectTag = function(tagId) {
            $location.path("/articles/tag/" + tagId);
            $("#display-tag").modal("hide");
        };
    
        // Définit quelle étiquette est en train d'être modifiée
        $scope.setCurrentEditedTag = function(tagId, tagName) {
            $scope.currentEditedTag = tagId;
            $scope.editTagNewNames[tagId] = tagName;
        };
    
        // Est-ce que l'étiquette en paramètre est celle qui est en train d'être modifiée ?
        $scope.isTagIsCurrentlyEdited = function(tagId) {
            if ($scope.currentEditedTag == tagId) {
                return true;
            }
            
            return false;
        };
    
        // Modifie l'étiquette
        $scope.processEditTag = function(tagId) {
            $scope.editTagLoading = true;
            $scope.editTagErrorMsg = "";

            apiService.editTag(tagId, $scope.editTagNewNames[tagId], function successCallback(response) {
                if (response.data.success == true) {
                    $scope.resetCurrentEditedTag();
                    displayTagsController.loadDatas();

                    $scope.editTagLoading = false;
                } else {
                    $scope.editTagLoading = false;
                    $scope.editTagErrorMsg = response.data.error
                }
            }, function errorCallback(response) {
                $scope.editTagLoading = false;
                $scope.editTagErrorMsg = "Impossible de modfier l'étiquette";
            });
        };
    
        $scope.resetCurrentEditedTag = function() {
            $scope.currentEditedTag = 0;
            $scope.editTagNewNames = [];
            $scope.editTagErrorMsg = "";
        };
    
        $scope.deleteTag = function(tagId) {
            bootbox.confirm("Voulez-vous vraiment supprimer cette étiquette ?", function(result) {
                console.log("ok");
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.tags = {};
            $scope.editLabelsErrorMsg = "";
            $scope.editLabelsLoading = false;
            $scope.currentEditedTag = 0;
        };
    });