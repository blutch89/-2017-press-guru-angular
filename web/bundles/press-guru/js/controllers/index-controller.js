angular.module('pressGuruApp')
    .controller('IndexController', function ($scope, $location, apiService, appParametersService, $routeParams, $location, $rootScope) {
        var indexController = this;
        appParametersService.currentController = this;
    
        // Variables
        $scope.articles = {};
        $scope.tagId = undefined;                   // Détermine l'id du tag spécifié en paramètre
        $scope.tagName = undefined;                 // Détermine le titre du tag ou encore le titre de la page
        $scope.sortValue = "1";                     // Détermine la valeur de la liste select dans la partie de tri
    
        // Variables pagination
        $scope.filteredArticles = [];               // Détermine les articles à afficher en utilisant la pagination
        $scope.currentPage = 1;                     // Détermine la page actuel dans la pagination
        $scope.numPerPage = 9;                      // Détermine combien d'articles sont affichés par page
    
        // Variables alerte
        $scope.alertMessage = "";
        $scope.isAlertClosed = true;
        $scope.alertType = "";
    
        // Fonctions
        // Listener change pour le select de la partie tri
        $scope.sortChange = function() {
            var sortBy = undefined;
            var sortDirection = undefined;
            
            switch ($scope.sortValue) {
                case "0":
                    sortBy = "date";
                    sortDirection = "asc";
                    break;
                case "1":
                    sortBy = "date";
                    sortDirection = "desc";
                    break;
            }
                                        
            // Modifie l'url
            $location.search("sortBy", sortBy);
            $location.search("sortDirection", sortDirection);
            
            // Recharge la liste des vidéos
            indexController.refreshPage();
        };
    
        // Converti le tri stirng en int pour le select de la partie tri
        this.convertSortToInt = function() {
            switch ($location.search()["sortDirection"]) {
                case "asc":
                    return "0";
                case "desc":
                    return "1";
                default:
                    return "1";
           }
        };
    
        // Listener change pour la pagination
        $scope.paginationChange = function() {
            indexController.setFilteredArticlesFromPagination();
        };
    
        // Filtre la collection d'articles en une nouvelle filtrée
        this.setFilteredArticlesFromPagination = function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;
            
            $scope.filteredArticles = $scope.articles.slice(begin, end);
        };
        
        // Archive un article
        $scope.archiveArticle = function(articleId) {
            apiService.archiveArticle(articleId, function successCallback(response) {
                if (response.data.success == true) {
                    indexController.refreshPage();
                    
                    // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                    $rootScope.$broadcast("markArticleAsRead");
                    
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
                                
                                // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                                $rootScope.$broadcast("deleteArticle");                                
                                
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
            
            var sortParams = {
                sortBy: $location.search()["sortBy"],
                sortDirection: $location.search()["sortDirection"]
            };
            
            var errorFunction = function errorCallback(response) {
                $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
            };
            
            
            
            // Téléchargement des articles
            if ($location.path() == "/articles/archived") { // Si on doit afficher les articles archivés
                apiService.getArchivedArticles(sortParams, function successCallback(response) {
                    if (response.data != undefined && response.data.success == true) {
                        $scope.articles = response.data.articles;
                        indexController.setFilteredArticlesFromPagination();
                        $scope.tagName = "Articles archivés";
                    } else {
                        $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                    }
                }, errorFunction);
            } else if ($scope.tagId == undefined) {         // Si on doit afficher tous les articles
                apiService.getArticles(sortParams, function successCallback(response) {
                    if (response.data != undefined && response.data.success == true) {
                        $scope.articles = response.data.articles;
                        indexController.setFilteredArticlesFromPagination();
                    } else {
                        $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                    }
                }, errorFunction);
            } else {                                        // Si on doit afficher les articles d'une catégorie
                apiService.getArticlesFromTag($scope.tagId, sortParams, function successCallback(response) {
                    if (response.data != undefined && response.data.success == true) {
                        $scope.articles = response.data.articles;
                        indexController.setFilteredArticlesFromPagination();
                        $scope.tagName = response.data["tag-name"];
                    } else {
                        $scope.createAlert("Une erreur est survenue lors du chargement de la page", "danger");
                    }
                }, errorFunction);
            }
        };
    
    
    
        // Met à jour la liste des articles quand cet évènement se produit
        $scope.$on("addArticle", function() {
            indexController.refreshPage();
        });
    
    
        // Appelé à la fin d'exécution de ce script (permet de prendre en compte les variables avant de lancer une fonction)
        this.afterRendered = function() {
            $scope.sortValue = indexController.convertSortToInt();
            this.refreshPage();
        };
    
        this.afterRendered();
    });