angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService) {
        connectionController = this;
    
        // Variables propre au login et register
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
        $scope.registrationFormData = {};
        $scope.registrationErrorMsg = "";
        $scope.confirmationSended = false;
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    userService.saveUser(response.data["user-id"], response.data["username"]);

                    $location.path("/");
                } else {
                    if (response.data.error == "Account disabled") {
                        $scope.loginErrorMsg = "L'utilisateur n'est pas encore activé.";
                    } else {
                        $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                    }
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
            });
        };
        
        // Fonction permettant de s'enregistrer
        $scope.processRegistrationForm = function() {      
            authentificationService.registerRequest($scope.registrationFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    $scope.confirmationSended = true;
                } else {
                    $scope.registrationErrorMsg = response.data.error;
                }
            }, function errorCallback(response) {
                $scope.registrationErrorMsg = response.data.error;
            });
        };
    });