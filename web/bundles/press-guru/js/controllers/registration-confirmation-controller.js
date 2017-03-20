angular.module('pressGuruApp')
    .controller('RegistrationConfirmationController', function ($scope, $location, $routeParams, authentificationService) {
        RegistrationConfirmationController = this;
    
        // Variables liées à la confirmation de l'accompte
        $scope.inProgress = true;
        $scope.success = false;
        
        this.activeAccount();    
    
        // Lance la requête d'activation
        this.activeAccount = function () {            
            authentificationService.activeAccount($routeParams.token, function successCallback (response) {
                if (response.data.success) {
                    // Indique que la requête est terminée
                    $scope.inProgress = false;
                } else {
                    
                }
            }, function errorCallback (response) {
                
            });
        };
    });