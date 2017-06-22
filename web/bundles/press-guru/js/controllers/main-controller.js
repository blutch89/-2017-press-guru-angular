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