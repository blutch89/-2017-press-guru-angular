angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService) {
        mainController = this;
        $scope.appParametersService = appParametersService;
    
        // A modifier
        $scope.addArticleUrl = "";

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
    });