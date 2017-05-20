angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService, apiService) {
        mainController = this;
        $scope.appParametersService = appParametersService;
    
        // Variables
        $scope.menuItems = {};

        $scope.isItConnectionPage = function() {
            return $location.path();
        };
        
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
    
        // Utile pour savoir si oui ou non on affiche les menus et les en-tête
        $scope.checkIfMustBeHidden = function() {
            var path = $location.path();
            
            for (var index in appParametersService.connectionPages) {
                var url = appParametersService.connectionPages[index];                                                   
                                                                   
                if (path.substr(0, url.length) == url) {
                    return true;
                }
            }
            
            return false;                              
        }
        
        // Charge les éléments du menus de la sidebar
        this.loadMenuItems = function() {
            apiService.getMenuItems(function successCallback(response) {
                if (response.data.success == true) {
                    $scope.menuItems = response.data["menuItems"];
                } else {
                    // TODO Afficher une erreur
                }
            }, function errorCallback(response) {
                // TODO Afficher une erreur
            });
        };
    
        // Appelé à la fin d'exécution de ce script (permet de prendre en compte les variables avant de lancer une fonction)
        this.afterRendered = function() {
            this.loadMenuItems();
        };
    
        this.afterRendered();
    });