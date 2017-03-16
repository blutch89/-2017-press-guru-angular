angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location) {
        connectionController = this;
    
        // Variables propre au login
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    $location.path("/");
                } else {
                    $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
            });
        };
    });