angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService, apiService, $window) {
        mainController = this;
        appParametersService.mainController = this;
        $scope.appParametersService = appParametersService;
    
        // Variables
        $scope.menuItems = {};
        $scope.loadMenuItemsLoading = true;
    
        // Alerte
        $scope.menuAlertMessage = "";
    
        
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
    
    
        // !!! TEST OBSERVER
        $scope.$on("eventtest", function() {
            console.log("test");
            $scope.$broadcast("eventtest", {});
        });
    
    
    
        // Appelé à la fin d'exécution de ce script (permet de prendre en compte les variables avant de lancer une fonction)
        this.afterRendered = function() {
            $scope.loadMenuItems();
        };
    
        this.afterRendered();
    });