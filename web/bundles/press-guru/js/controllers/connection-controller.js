angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService) {
        connectionController = this;
    
        // Variables propre au login et register
        $scope.loginLoading = false;
        $scope.registrationLoading = false;
        $scope.loginFormData = {};
        $scope.loginErrorMsg = "";
        $scope.registrationFormData = {};
        $scope.registrationErrorMsg = "";
        $scope.confirmationSended = false;
    
        // Fonction permettant de loguer un utilisateur
        $scope.processLoginForm = function() {
            $scope.loginLoading = true;
            
            authentificationService.loginRequest($scope.loginFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    userService.saveUser(response.data["user-id"], response.data["username"]);
                    $scope.loginLoading = true;
                    
                    $location.path("/");
                } else {
                    if (response.data.error == "Account disabled") {
                        $scope.loginErrorMsg = "L'utilisateur n'est pas encore activé.";
                    } else {
                        $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                    }
                    
                    $scope.loginLoading = false;
                }
            }, function errorCallback(response) {
                $scope.loginErrorMsg = "L'utilisateur ou le mot de passe est incorrect.";
                $scope.loginLoading = false;
            });
        };
        
        // Fonction permettant de s'enregistrer
        $scope.processRegistrationForm = function() {  
            $scope.registrationLoading = true;
            
            authentificationService.registerRequest($scope.registrationFormData, function successCalllback(response) {
                if (response.data.success == true) {
                    $scope.confirmationSended = true;
                    $scope.registrationLoading = false;
                } else {
                    $scope.registrationErrorMsg = response.data.error;
                    $scope.registrationLoading = false;
                }
            }, function errorCallback(response) {
                $scope.registrationErrorMsg = response.data.error;
                $scope.registrationLoading = false;
            });
        };
    });