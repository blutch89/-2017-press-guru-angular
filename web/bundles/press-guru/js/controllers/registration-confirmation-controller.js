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