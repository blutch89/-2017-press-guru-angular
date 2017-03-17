angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService) {
        connectionController = this;
    
        // Variables propre au login
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
        $scope.registrationFormData = {};
        $scope.registrationErrorMsg = "";
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    userService.saveUser(response.data["user-id"], response.data["username"]);

                    $location.path("/");
                } else {
                    $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
            });
        };
        
        // Fonction permettant de s'enregistrer
        $scope.processRegistrationForm = function() {
            console.log("registration");
        };
    });