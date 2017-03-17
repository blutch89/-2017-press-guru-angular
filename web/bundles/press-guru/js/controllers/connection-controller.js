angular.module('pressGuruApp')
    .controller('ConnectionController', function ($scope, $location, authentificationService, userService, $http) {
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
            $http({
                method  : 'POST',
                url     : "/press-guru/web/app_dev.php/register",
                data    : $.param($scope.registrationFormData),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(response) {
                console.log("ok");   
            }, function(response) {
                console.log("pas ok");
            });
            
            
            
            
            
            
//            authentificationService.registerRequest($scope.registrationFormData, function successCalllback(response) {
//                console.log(response);
//                if (response.data.success == true) {        // Si réussi à s'enregistrer, log l'utilisateur
//                    var loginDatas = {};
//                    loginDatas._username = $scope.registrationFormData.username;
//                    loginDatas._password = $scope.registrationFormData.first;
//
//                    authentificationService.loginRequest(loginDatas, function(response) {
//                        if (response.data.success == true) {
//                            userService.saveUser(response.data["user-id"], response.data["username"]);
//
//                            $location.path("/");
//                        } else {
//                            $scope.registrationErrorMsg = "Impossible de s'identifier. Essayez depuis la zone de connexion.";
//                        }
//                    }, null);
//                } else {
//                    $scope.registrationErrorMsg = response.data.error;
//                }
//            }, function errorCallback(response) {
//                $scope.registrationErrorMsg = response.data.error;
//            });
        };
    });