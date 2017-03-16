angular.module('pressGuruApp')
    .controller('MainController', function ($scope, $location, authentificationService) {
        mainController = this;

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
        
    });