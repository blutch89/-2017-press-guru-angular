angular
    .module('pressGuruApp', ['ngRoute', 'ui.bootstrap'])
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .when('/articles/tag/:tagId', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .when('/articles/archived', {
                templateUrl: 'bundles/press-guru/views/index.html',
                controller: 'IndexController',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('httpResponseInterceptor');
    }]);


angular.module('pressGuruApp')
    .service("appParametersService", function () {
        var appParametersService = this;

        // Paths
        var paths = {};
        paths.prefix = "";
//        paths.prefix = "app_dev.php/";
    
        // Preprefix = variable utilisée pour utiliser le bon path sur la page authentification. "" pour mode prod et "../" pour mode dev
        // Ne pas oublier de modifier également dans le fichier appAuthentication la variable preprefix
        paths.preprefix = "";
//        paths.preprefix = "../";
        paths.webResources = "bundles/press-guru/";
        paths.api = paths.prefix + "frontend-api/";

        this.paths = paths;
    
        // Contrôleurs
        this.mainController = null;
        this.currentController = null;
    
        // Variables partagées
        this.editLabelsDialogController = null;
        this.displayTagsDialogController = null;
});
angular.module('pressGuruApp')
    .service("authentificationService", function ($http, $location, appParametersService, csrftoken) {    
        this.loginRequest = function (datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.preprefix + appParametersService.paths.prefix + "login_check", datas, successFunction, errorFunction);
        };

        this.registerRequest = function (datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.preprefix + appParametersService.paths.prefix + "register", datas, successFunction, errorFunction);
        };
    
        this.activeAccount = function (token, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.preprefix + appParametersService.paths.prefix + "confirm/" + token, successFunction, errorFunction)
        };
    
        this.logoutRequest = function(successFunction, errorFunction) {
        	this.executeRestApi(appParametersService.paths.prefix + "logout", successFunction, errorFunction);
        };
    
    

        // Permet d'exécuter une requête de type GET
        this.executeRestApi = function(url, successFunction, errorFunction) {
            $http({
                method: "GET",
                url: url
            }).then(successFunction, errorFunction);
        };
    
        // Permet d'exéuter une requête post de formulaire
        this.executePostForm = function (url, datas, successFunction, errorFunction) {
            datas["csrftoken"] = csrftoken;      // Ajout du token CSRF pour sécuriser l'appel à l'API
            
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param(datas),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(successFunction, errorFunction);
        };
    });
angular.module('pressGuruApp')
    .factory('httpResponseInterceptor', ['appParametersService', '$window', function (appParametersService, $window) {
        return {
            responseError: function (response) {
                // S'il y a une erreur 401 (non autorisé), redirige l'utilisateur sur la page de connexion
                if (response.status === 401) {
                    $window.location.href = appParametersService.paths.prefix + "authentication#!/connection";
                }
                
                return response;
            }
        };
    }])
angular.module('pressGuruApp')
    .service("apiService", function($http, $location, appParametersService, csrftoken) {
    	apiService = this;
    
        // Demande la liste des éléments du menu latéral
        this.getMenuItems = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "architecture/get-menu-items", successFunction, errorFunction);
        };
    
        // Demande tous les articles
        this.getArticles = function(sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/all" + toAddInUrl, successFunction, errorFunction);
        };
    
        // Demande les articles d'une étiquette
        this.getArticlesFromTag = function(tagId, sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/" + tagId + toAddInUrl, successFunction, errorFunction);
        };
    
        // Demande les articles archivés
        this.getArchivedArticles = function(sortParams, successFunction, errorFunction) {
            var toAddInUrl = this.calculateSortParametersUrl(sortParams);
            
            this.executeRestApi(appParametersService.paths.api + "articles/get/archived" + toAddInUrl, successFunction, errorFunction);
        };
    
        // Ajout un article
        this.addArticle = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/add", datas,
            	successFunction, errorFunction);
        };
    
        // Archive un article
        this.archiveArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/archive/" + articleId, successFunction, errorFunction);
        };
        
        // Charge les infos de base pour la fenêtre de modification des étiquettes d'un article
        this.loadLabelsDialogDatas = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/load-labels-dialog-datas/" + articleId, successFunction, errorFunction);
        };
    
        // Modifie les étiquettes d'un article
        this.editArticleLabels = function(articleId, articleLabels, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "articles/edit-labels", {"article-id": articleId, "article-labels": articleLabels}, successFunction, errorFunction);
        };
        
        // Supprime un article
        this.removeArticle = function(articleId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "articles/delete/" + articleId, successFunction, errorFunction);
        };
    
        // Ajout d'une étiquette
        this.addTag = function(datas, successFunction, errorFunction) {
            this.executePostForm(appParametersService.paths.api + "tags/add", datas,
            	successFunction, errorFunction);
        };
    
        // Demande toutes les étiquettes
        this.getTags = function(successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "tags/get/all",
            	successFunction, errorFunction);
        };
    
        // Modifie l'étiquette
        this.editTag = function(tagId, newName, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "tags/edit/" + tagId + "/" + newName,
            	successFunction, errorFunction);
        };
    
        // Modifie l'étiquette
        this.deleteTag = function(tagId, successFunction, errorFunction) {
            this.executeRestApi(appParametersService.paths.api + "tags/delete/" + tagId,
            	successFunction, errorFunction);
        };
    
        




        

        // Permet d'exéuter une requête pour une API et qu'en cas de non autorisation, redirige sur la page de connexion
        this.executeRestApi = function(url, successFunction, errorFunction) {
            $http({
                method: "GET",
                url: url,
                headers: {"csrftoken": csrftoken}       // Ajout du token CSRF pour sécuriser l'appel à l'API
            }).then(successFunction, errorFunction);
        };

        // Permet d'exéuter une requête post de formulaire
        this.executePostForm = function(url, datas, successFunction, errorFunction) {
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param(datas),
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'csrftoken': csrftoken              // Ajout du token CSRF pour sécuriser l'appel à l'API
                }
            }).then(successFunction, errorFunction);
        };
    
    
        // Autres méthodes helper
        this.calculateSortParametersUrl = function(sortParams) {
            if (sortParams["sortBy"] !== undefined) {
                return "?sortBy=" + sortParams["sortBy"] + "&sortDirection=" + sortParams["sortDirection"];
            }
            
            return "";
        };
});
angular.module('pressGuruApp')
    .service("userService", function() {
        this.getUserId = function() {
            return localStorage.getItem("user-id");
        };

        this.getUsername = function() {
            return localStorage.getItem("username");
        };

        this.saveUser = function(userId, username) {
            localStorage.setItem("user-id", userId);
            localStorage.setItem("username", username);
        };
});
angular.module('pressGuruApp')
  .directive('loading', function () {
    return {
        template: '<div ng-show="loading" class="loading-container"></div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            loading: '=value'
        },
        compile: function compile(element, attrs, transclude) {
            var spinner = new Spinner().spin();
            $(element).html(spinner.el);
        }
    };
  });
angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService, apiService, $window, userService) {
        mainController = this;
        appParametersService.mainController = this;
        $scope.appParametersService = appParametersService;

        // Variables
        $scope.menuItems = {};
        $scope.loadMenuItemsLoading = true;
    
        // Alerte
        $scope.menuAlertMessage = "";
    
        // Inscrit le nom de l'utilisateur dans le header
        $scope.getUsername = function() {
            return userService.getUsername();
        };        
    
        // Déconnecte l'utilisateur
        $scope.logout = function() {
    		authentificationService.logoutRequest(function successCallback(response) {
    			if (response.data.success == true) {
	    			$window.location.href = appParametersService.paths.prefix + "authentication#!/connection";
	    		} else {

	    		}
    		}, function errorCallback(response) {
    			
    		});
    	};
        
        // Charge les éléments du menus de la sidebar
        $scope.loadMenuItems = function() {
            $scope.menuAlertMessage = "";
            $scope.loadMenuItemsLoading = true;
            
            apiService.getMenuItems(function successCallback(response) {
                if (response.data.success == true) {
                    $scope.menuItems = response.data["menuItems"];
                    $scope.loadMenuItemsLoading = false;
                } else {
                    $scope.createAlert("Impossible de charger le menu");
                    $scope.loadMenuItemsLoading = false;
                }
            }, function errorCallback(response) {
                $scope.createAlert("Impossible de charger le menu");
                $scope.loadMenuItemsLoading = false;
            });
        };
    
        this.loadMenuItems = function() {
            $scope.loadMenuItems();
        };
    
        // Affiche la fenêtre d'affichage des étiquettes
        $scope.displayTagsDialog = function() {
            $("#display-tag").modal("show");
            appParametersService.displayTagsDialogController.loadDatas();
        };
    
        // Crée un message d'alerte
        $scope.createAlert = function(message) {
        	$scope.menuAlertMessage = message;
        };
    
    
    
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("addArticle", function() {
            $scope.loadMenuItems();
        });
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("markArticleAsRead", function() {
            $scope.loadMenuItems();
        });
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("editArticleTags", function() {
            $scope.loadMenuItems();
        });
        
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("deleteArticle", function() {
            $scope.loadMenuItems();
        });
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("addTag", function() {
            $scope.loadMenuItems();
        });
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("editTag", function() {
            $scope.loadMenuItems();
        });
    
        // Met à jour la liste des menus quand cet évènement se produit
        $scope.$on("deleteTag", function() {
            $scope.loadMenuItems();
        });
    
    
    
    
    
        // Appelé à la fin d'exécution de ce script (permet de prendre en compte les variables avant de lancer une fonction)
        this.afterRendered = function() {
            $scope.loadMenuItems();
        };
    
        this.afterRendered();
    });
angular.module('pressGuruApp')
    .controller('AddArticleController', function ($scope, apiService, appParametersService, $rootScope) {
        addArticleController = this;
    
        // Variables liées à l'ajout d'articles
        $scope.addArticleLoading = false;
        $scope.addArticleDatas = {};
        $scope.addArticleErrorMsg = "";
        $scope.success = false;
        
        // Fonction ajoutant l'article
        $scope.processAddArticleForm = function() {
            $scope.addArticleLoading = true;
            $scope.addArticleErrorMsg = "";
            
            apiService.addArticle($scope.addArticleDatas, function successCallback(response) {
                if (response.data.success == true) {
                    $scope.addArticleLoading = false;
                    $scope.success = true;
                    
                    // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                    $rootScope.$broadcast("addArticle", {});
                } else {
                    $scope.addArticleErrorMsg = response.data.error;
                    $scope.addArticleLoading = false;
                    $scope.success = false;
                }
            }, function errorCallback(response) {
                $scope.addArticleErrorMsg = response.data.error;
                $scope.addArticleLoading = false;
                $scope.success = false;
            });
        };
    
        // Reset
        $scope.resetDatas = function() {
            $scope.addArticleDatas = {};
            $scope.addArticleErrorMsg = "";
            $scope.addArticleLoading = false;
            $scope.success = false;
        };
    });
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
angular.module('pressGuruApp')
    .controller('EditArticleLabelsController', function ($scope, apiService, appParametersService, $rootScope) {
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
                    // Lance un évènement depuis le rootScope pour mettre à jour les données de la page
                    $rootScope.$broadcast("editArticleTags");
                    
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
angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService, appParametersService, $window, csrftoken) {
        connectionController = this;
    
        // Variables propre au login et register
        $scope.loginLoading = false;
        $scope.registrationLoading = false;
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
        $scope.registrationFormData = {};
        $scope.registrationErrorMsg = "";
        $scope.confirmationSended = false;
        $scope.csrftoken = csrftoken;
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            $scope.loginLoading = true;
            
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    userService.saveUser(response.data["user-id"], response.data["username"]);
                    $scope.loginLoading = false;
                    
                    // Redirige sur la page principale en enlevant la dernière lettre au prefix
                    $window.location.href = appParametersService.paths.preprefix + appParametersService.paths.prefix.substr(0, appParametersService.paths.prefix.length -1);
                } else {
                    if (response.data.error == "Account disabled") {
                        $scope.loginErrorMsg = "L'utilisateur n'est pas encore activé.";
                    } else {
                        $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                    }
                    
                    $scope.loginLoading = false;
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                $scope.loginLoading = false;
            });
        };
        
        // Fonction permettant de s'enregistrer
        $scope.processRegistrationForm = function() {  
            $scope.registrationLoading = true;
            
            authentificationService.registerRequest($scope.registrationFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    $scope.confirmationSended = true;
                    $scope.registrationLoading = false;
                } else {
                    $scope.registrationErrorMsg = response.data.error;
                    $scope.registrationLoading = false;
                }
            }, function errorCallback(response) {
                $scope.registrationErrorMsg = response.data.error;
                $scope.registrationLoading = false;
            });
        };
    });
angular.module('pressGuruApp')
    .controller('RegistrationConfirmationController', function ($scope, $location, $routeParams, authentificationService) {
        RegistrationConfirmationController = this;
    
        // Variables liées à la activation de l'utilisateur
        $scope.inProgress = true;
        $scope.success = false;
        $scope.errorMsg = "";
    
        // Lance la requête d'activation
        this.activeAccount = function () {
            authentificationService.activeAccount($routeParams.token, function successCallback (response) {
                if (response.data.success) {
                    $scope.success = true;
                    $scope.inProgress = false;
                } else {
                    $scope.success = false;
                    $scope.inProgress = false;
                    $scope.errorMsg = response.data.error;
                }
            }, function errorCallback (response) {
                $scope.success = false;
                $scope.inProgress = false;
                $scope.errorMsg = response.data.error;
            });
        };
    
        $scope.goToConnection = function() {
            $location.path("/connection");
        };
    
        this.activeAccount();
    });