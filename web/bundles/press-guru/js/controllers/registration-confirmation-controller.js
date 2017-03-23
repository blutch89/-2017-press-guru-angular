angular.module('pressGuruApp')
    .controller('RegistrationConfirmationController', function ($scope, $location, $routeParams, authentificationService) {
        RegistrationConfirmationController = this;
    
        // Variables liées à la confirmation de l'accompte
        $scope.inProgress = true;
        $scope.success = false;            
    
        // Lance la requête d'activation
        this.activeAccount = function () {            
            authentificationService.activeAccount($routeParams.token, function successCallback (response) {
                if (response.data.success) {
                    $scope.success = true;
                    $scope.inProgress = false;
                } else {
                    $scope.success = false;
                    $scope.inProgress = false;
                }
            }, function errorCallback (response) {
                $scope.success = false;
                $scope.inProgress = false;
            });
        };
    
        this.activeAccount();
    });