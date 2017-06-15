angular.module('pressGuruApp')
    .controller('DisplayTagsController', function ($scope, apiService, appParametersService, $location, $rootScope) {
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
        
        // Variables liées aux messages d'erreurs
        $scope.alertMessage = "";
        $scope.isAlertClosed = true;
        $scope.alertType = "";
        
    
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
                    $scope.createAlert(response.data.error, "danger");
                }
            }, function errorCallback(response) {
                $scope.displayTagsLoading = false;
                $scope.createAlert("Impossible de charger les étiquettes", "danger");
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
            $scope.alertMessage = "";

            apiService.editTag(tagId, $scope.editTagNewNames[tagId], function successCallback(response) {
                if (response.data.success == true) {
                    $scope.resetCurrentEditedTag();
                    displayTagsController.loadDatas();
                    
                    // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                    $rootScope.$broadcast("editTag");

                    $scope.editTagLoading = false;
                    $scope.createAlert("Etiquette modifiée", "success");
                } else {
                    $scope.editTagLoading = false;
                    $scope.createAlert(response.data.error, "danger");
                }
            }, function errorCallback(response) {
                $scope.editTagLoading = false;
                $scope.createAlert("Impossible de modfier l'étiquette", "danger");
            });
        };
    
        $scope.resetCurrentEditedTag = function() {
            $scope.currentEditedTag = 0;
            $scope.editTagNewNames = [];
            $scope.alertMessage = "";
        };
    
        $scope.deleteTag = function(tagId) {
            bootbox.confirm({
                message: "Êtes-vous vraiment sûr de vouloir supprimer cette étiquette ?",
                buttons: {
                    cancel: {
                        label: 'Non',
                        className: 'btn-default'
                    },
                    confirm: {
                        label: 'Oui',
                        className: 'btn-primary'
                    }
                },
                callback: function(result) {
                    if (result === true) {
                        apiService.deleteTag(tagId, function successCallback(response) {
                            if (response.data.success == true) {
                                displayTagsController.loadDatas();
                                
                                // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                                $rootScope.$broadcast("deleteTag");
                                
                                $scope.createAlert("Etiquette supprimée", "success");
                            } else {
                                $scope.createAlert("Impossible de supprimer l'étiquette", "danger");
                            }
                        }, function errorCallback(response) {
                            $scope.createAlert("Impossible de supprime l'étiquette", "danger");
                        });
                }
            }});
        };
    
        // Crée un message d'alerte
        $scope.createAlert = function(message, alertType) {
        	$scope.alertMessage = message;
        	$scope.isAlertClosed = false;
            $scope.alertType = alertType;
        };
    
        // Ferme le message d'alerte
        $scope.closeAlertMessage = function() {
            $scope.alertMessage = "";
        	$scope.isAlertClosed = true;
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.tags = {};
            $scope.alertMessage = "";
            $scope.isAlertClosed = true;
            $scope.editLabelsLoading = false;
            $scope.currentEditedTag = 0;
        };
    });