angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService, apiService) {
        mainController = this;
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
	    			$location.path("/connection");
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
    
        // Crée un message d'alerte
        $scope.createAlert = function(message) {
        	$scope.menuAlertMessage = message;
        };
    
        // Appelé à la fin d'exécution de ce script (permet de prendre en compte les variables avant de lancer une fonction)
        this.afterRendered = function() {
            $scope.loadMenuItems();
        };
    
        this.afterRendered();
    });