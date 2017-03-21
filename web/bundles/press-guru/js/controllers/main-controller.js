angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService, appParametersService) {
        mainController = this;
        $scope.appParametersService = appParametersService;

        $scope.isItConnectionPage = function() {
            return $location.path();
        };
        
        // Déconnecte l'utilisateur
        $scope.logout = function() {
    		authentificationService.logoutRequest(function successCallback(response) {
    			if (response.data.success == true) {
                    appParametersService.isConnected = false;
	    			$location.path("/connection");
	    		} else {

	    		}
    		}, function errorCallback(response) {
    			
    		});
    	};
    });