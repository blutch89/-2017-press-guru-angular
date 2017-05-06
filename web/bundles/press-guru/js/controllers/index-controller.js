angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService, $routeParams) {
        var indexController = this;
        appParametersService.currentController = this;
        
        // Variables
        $scope.articles = {};
        $scope.tagId = undefined;
        $scope.tagName = undefined;
    
        // Variables alerte
        $scope.alertMessage = "";
        $scope.isAlertClosed = true;
        $scope.alertType = "";
    
        // Fonctions    
        // Archive un article
        $scope.archiveArticle = function(articleId) {
            apiService.archiveArticle(articleId, function successCallback(response) {
                if (response.data.success == true) {
                    indexController.refreshPage();
                    $scope.createAlert("Article archivé", "success");
                } else {
                    $scope.createAlert("Impossible d'archiver l'article", "danger");
                }
            }, function errorCallback(response) {
                $scope.createAlert("Impossible d'archiver l'article", "danger");
            });
        };
    
        // Supprime un article
        $scope.removeArticle = function(articleId) {
            bootbox.confirm({
                message: "Êtes-vous vraiment sûr de vouloir supprimer cet article ?",
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
                        apiService.removeArticle(articleId, function successCallback(response) {
                            if (response.data.success == true) {
                                indexController.refreshPage();
                                $scope.createAlert("Article supprimé", "success");
                            } else {
                                $scope.createAlert("Impossible de supprimer l'article", "danger");
                            }
                        }, function errorCallback(response) {
                            $scope.createAlert("Impossible de supprime l'article", "danger");
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
    
        // Affiche la fenêtre d'édition d'étiquettes
        $scope.displayLabelsDialog = function(articleId) {
            $("#editLabelsDialog").modal("show");
            appParametersService.editLabelsDialogController.loadLabelsDialogDatas(articleId);
        };
        
        // Recharge la page
        this.refreshPage = function() {
            // Paramètres
            $scope.tagId = $routeParams.tagId;
            
            // Fonctions callback
            var successFunction = function successCallback(response) {
                if (response.data.success == true) {
                    $scope.articles = response.data.articles;
                } else {
                    $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                }
            };
            
            var errorFunction = function errorCallback(response) {
                $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
            };
            
            // Téléchargement des articles
            if ($scope.tagId == undefined) {  // Si on doit afficher tous les articles
                apiService.getArticles(function successCallback(response) {
                    if (response.data.success == true) {
                        $scope.articles = response.data.articles;
                    } else {
                        $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                    }
                }, errorFunction);
            } else {                        // Si on doit afficher les articles d'une catégorie
                apiService.getArticlesFromTag($scope.tagId, function successCallback(response) {
                    if (response.data.success == true) {
                        $scope.articles = response.data.articles;
                        $scope.tagName = response.data["tag-name"];
                    } else {
                        $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                    }
                }, errorFunction);
            }
        };
    
        this.refreshPage();
    });